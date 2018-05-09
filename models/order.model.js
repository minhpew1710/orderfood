import { Mongoose } from 'mongoose';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
    UserId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    TableId:{
        type: Mongoose.Schema.Types.ObjectId,
        ref:'Table',
        required: true
    },
    OrderDate:{
        type: Date,
        required: true
    },
    isOrderStatus:{
        type: Boolean,
        required: true
    }
});
var Order = mongoose.model('Order', orderSchema);
module.exports = Order;