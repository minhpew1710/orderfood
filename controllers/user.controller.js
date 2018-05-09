var fs = require('fs');
var path = require('path');
var userDao = require('../dao/userDao');
var jwt = require('./../utils/jwt');
var crypto = require('./../utils/crypto');
var User = require('../models/user.model');

module.exports = {
    updateUser: updateUser,
    removeUser: removeUser,
    paginateUser: paginateUser,
    changePassword: changePassword,
    getAllUser: getAllUser
}
function validateUserModel(userModel){
    var errors = [];
    if(!userModel.serName){
        errors.push("Username is required!");
    }
    if(!userModel.password){
        errors.push("Password is required!");
    }
    if(!userModel.PermissionId){
        errors.push("Permission is required!");
    }
    return errors;
}
function getAllUser(req,res){
    User.find()
    .select("userName email gender age permission")
    .populate('permission','permissionId permissionName')
    .exec(function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    });
}
function updateUser(req,res,next){
    var userId = req.params.userId;
    var userModel = req.body;  
    if(!userId){
        next("Không tìm thấy");
    }else{
        userDao.updateById(userId,userModel)
        .then(function(err,result){
            if(err){
                res.send(err);
            }else{
                res.send(result);
            }
        })
        .catch(function(err){
            next(err);
        });
    }
}

function removeUser(req,res,next){
    var userId = req.params.userId;
    if(!userId){
        next("Không tìm thấy");
    }else{
        userDao.deleteById(userId)
        .then(function(err,result){
            if(err){
                res.send(err);
            }else{
                res.send(result);
            }
        })
        .catch(function(err){
            next(err);
        });
    }
}

function paginateUser(req,res,next){
    var query = req.query;
    var page = query.page;
    var limit = query.limit;
    var skip = page>1?(page-1)*limit:0;
    var sortBy = query.sortBy;
    var isDes = query.isDes?true:false;
    userDao.findAll({},parseInt(skip),parseInt(limit),"",sortBy,isDes)
    .then(function (users){
        res.send(users);
    })
    .catch(function(err){
        next(err);
    });
}
function changePassword(req,res,next){
    var userModel = req.body;
    var userId = req.decoded._id;
    var userInDb;
    if(!req.body.oldPasssword || !req.body.newPassword){
        return res.status.send(400).send({
            errCode: 0,
            errMsg: "Mật khẩu cũ với mới là bắt buộc"
        });
    }
    userDao.findById(userId)
    .then(function(user){
        userInDB = user;
        return crypto.hashWithSalt(userModel.Password,user.Salt);
    })
    .then(function(hash){
        if(hash == userInDB.Password){
            var hashedNew = crypto.hashWithSalt(userModel.newPassword);
            userDao.updateById(userId,{Password: crypto.hashWithSalt(hashedNew)});
        }else{
            next("Lỗi hệ thống");
        }
    })
    .then(function(user){
        res.send(user);
    })
    .catch(function(err){
        next("Lỗi hệ thống");
    });
}