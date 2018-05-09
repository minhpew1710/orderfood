import { Mongoose } from 'mongoose';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var foodSchema = new Schema({
    foodName: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        default:'/',
        
    }
});
// chong trung username
foodSchema.index({foodName: 1}, {unique: 1});
var Food = mongoose.model('Food', foodSchema);



module.exports = Food;