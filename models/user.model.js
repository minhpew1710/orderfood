var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: {
        type: String,
        lowercase:true,
        trim:true,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    name:{
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    gender:{
        type: String
    },
    age:{
        type: Number,
        min:18,
        max:60
    },
    permission:{
        type: Schema.Types.ObjectId,
        ref:'Permission',
        required:true
    }
});
userSchema.index({userName: 1}, {unique: 1});
userSchema.index({email:1},{unique:1});
var User = mongoose.model('User', userSchema);
module.exports = User;