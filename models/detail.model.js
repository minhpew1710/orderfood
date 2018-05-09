import { Mongoose } from 'mongoose';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var detailSchema = new Schema({
    OrderId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required: true
    },
    FoodId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true
    },
    Quantity:{
        type: Number,
        required: true
    }
});

var Detail = mongoose.model('Detail', detailSchema);
module.exports = Detail;