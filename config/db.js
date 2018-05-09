var mongoose = require('mongoose');
module.exports = {
    dbConnect: dbConnect
}
function dbConnect() {
    mongoose.connect('mongodb://orderfood:123456@ds119490.mlab.com:19490/orderfood');
}