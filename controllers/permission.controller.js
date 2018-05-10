var fs = require('fs');
var path = require('path');
var permissionDao = require('../dao/permissionDao');
var jwt = require('./../utils/jwt');
var crypto = require('./../utils/crypto');
var Permission = require('../models/permission.model');

module.exports = {
    createPermission: createPermission
}
function validatePermissionModel(permissionModel){
    var errors = [];
    if(!permissionModel.permissionName){
        errors.push("Permission name is required!");
    }
    return errors;
}
function createPermission(req,res,next){
    var permissionModel = req.body;
    var errors = validatePermissionModel(permissionModel);
    if(errors.length>0){
        return next(errors);
    }
    permissionDao.findOne({permissionName: permissionModel.permissionName},'')
    .then(function(permission){
        if(permission){
            next("Permission is exist!");
        }else{
            return permissionDao.createPermission(permissionModel);
        }     
    })
    .then(function(permission){
        res.send(permission);
    })
    .catch(function(err){
        next(err);
    })
}
function updatePermission(req,res,next){
    var permissionId = req.params.permissionId;
    var permissionModel = req.body;  
    if(!permissionId){
        next("Không tìm thấy");
    }else{
        permissionDao.updateById(permissionId,permissionModel)
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
function removePermission(req,res,next){
    var permissionId = req.params.permissionId;
    if(!permissionId){
        next("Không tìm thấy");
    }else{
        permissionDao.deleteById(permissionId)
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
function paginatePermission(req,res,next){
    var query = req.query;
    var page = query.page;
    var limit = query.limit;
    var skip = page>1?(page-1)*limit:0;
    var sortBy = query.sortBy;
    var isDes = query.isDes?true:false;
    permissionDao.findAll({},parseInt(skip),parseInt(limit),"",sortBy,isDes)
    .then(function (permissions){
        res.send(permissions);
    })
    .catch(function(err){
        next(err);
    });
}