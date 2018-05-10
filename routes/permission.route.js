var router = require('express').Router();
var fs = require("fs");
var path = require('path');
var jwt = require('./../utils/jwt');
var permissionController = require('../controllers/permission.controller');

module.exports = function () {
    router.post('/createPermission', permissionController.createPermission);
    router.put('/updatePermission/:permissionId',permissionController.updatePermission);
    router.delete('/deletePermission/:permissionId',permissionController.removePermission);
    router.get('/listPermission',permissionController.paginatePermission);
    return router;
};