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

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/users/', userRouter());
app.use('/auths/',authRouter());
app.use('/permission/',permissionRouter());

app.use(errorHandler.errorHandler());

app.listen(8081,function(){
    console.log("Ứng dụng OrderFood đang lắng nghe tại địa chỉ..");
})