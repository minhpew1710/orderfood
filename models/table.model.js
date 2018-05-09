import { Mongoose } from 'mongoose';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tableSchema = new Schema({
    tableName: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});
tableSchema.index({tableName: 1}, {unique: 1});
var Table = mongoose.model('Table', tableSchema);
module.exports = Table;