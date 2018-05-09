var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    
    categoryName: {
        type: String,
        required: true
    }
});
categorySchema.index({categoryName: 1}, {unique: 1});
var Category = mongoose.model('Category', categorySchema);
module.exports = Category;