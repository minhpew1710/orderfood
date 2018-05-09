var mongoose = require('mongoose');
module.exports = {
    dbConnect: dbConnect
}
function dbConnect() {
    mongoose.connect('mongodb://minhpham1710:ngqtrungQ1@@ds119490.mlab.com:19490/orderfood');
}