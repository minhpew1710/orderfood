var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var router = express.Router();
var userRouter = require('./routes/user.route');
var authRouter = require('./routes/auth.route');
var permissionRouter = require('./routes/permission.route');
var errorHandler = require('./middle-ware/error-handler');
var db = require('./config/db').dbConnect();
var serverConfig = require('./config/server');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('doc'));

app.use(serverConfig.baseUrl + '/users', userRouter());
app.use(serverConfig.baseUrl + '/auths', authRouter());
app.use(serverConfig.baseUrl + '/permission',permissionRouter());

app.use(errorHandler.errorHandler());

app.listen(serverConfig.port,function(){
    console.log("Ứng dụng OrderFood đang lắng nghe tại địa chỉ..");
})