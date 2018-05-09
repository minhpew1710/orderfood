var router = require('express').Router();
var fs = require("fs");
var path = require('path');
var jwt = require('./../utils/jwt');
var userController = require('../controllers/user.controller');

module.exports = function () {
    router.get('/listUser',userController.paginateUser);
    router.get('/getAllUser',userController.getAllUser);
    router.put('/update/:userId',userController.updateUser);
    router.delete('/delete/:userId',userController.removeUser);
    router.post('/changePassword',userController.changePassword);
    return router;
};