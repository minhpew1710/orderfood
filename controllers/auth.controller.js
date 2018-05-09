var fs = require('fs');
var path = require('path');
var userDao = require('../dao/userDao');
var jwt = require('../utils/jwt');
var crypto = require('../utils/crypto');
var User = require('../models/user.model');

module.exports = {
    register: register,
    login: login
}
function validateUserModel(userModel){
    var errors = [];
    if(!userModel.userName){
        errors.push("Username is required!");
    }
    if(!userModel.password){
        errors.push("Password is required!");
    }
    return errors;
}
function register(req,res,next){
    var userModel = req.body;
    var errors = validateUserModel(userModel);
    if(errors.length>0){
        return next(errors);
    }
    userDao.findOne({username: userModel.userName})
    .then(function(user){
        if(user){
            next("Username is exist!");
        }else{
            userModel.salt = crypto.genSalt();
            return crypto.hashWithSaltAsync(userModel.password,userModel.salt);
        }     
    })
    .then(function(hash){
        userModel.password = hash;
        return userDao.createUser(userModel);
    })
    .then(function(user){
        res.send(user);
    })
    .catch(function(err){
        next(err);
    })
}
function login(req,res,next){
    var userModel = req.body;
    var userInDB={};
    var errors = validateUserModel(userModel);
    if(errors.length>0){
        return next(errors);
    }
    userDao.findOne({ userName: userModel.userName },'')
    .then(function(user){
        userInDB = user;
        return crypto.hashWithSaltAsync(userModel.password,user.salt);
    })
    .then(function(hash){
        if(hash == userInDB.password){
            var userInToDB = {userName:userInDB.userName,name: userInDB.name};
            jwt.sign(userInToDB,function(err,token){
                if(err){
                    next(err);
                }else{
                    res.send(token);
                }
            });
        }else{
            next("Username or Password wrong");
        }
    })
    .catch(function(err){
        next("Username or Password wrong");
    });
}