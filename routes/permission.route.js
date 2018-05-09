var router = require('express').Router();
var fs = require("fs");
var path = require('path');
var jwt = require('./../utils/jwt');
var permissionController = require('../controllers/permission.controller');

module.exports = function () {
    router.post('/createPermission', permissionController.createPermission);
    return router;
};