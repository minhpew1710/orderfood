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