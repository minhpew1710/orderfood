var router = require('express').Router();
var fs = require("fs");
var path = require('path');
var jwt = require('../utils/jwt');
var authController = require('../controllers/auth.controller');

module.exports = function () {
    router.post('/login', authController.login);
    router.post('/register', authController.register);
    return router;
};

