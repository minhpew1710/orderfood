var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var permissionSchema = new Schema({
    permissionId:{
        type: Number,
        required:true
    },
    permissionName: {
        type: String,
        required: true
    }
});
permissionSchema.index({permissionId:1},{unique:1});
permissionSchema.index({permissionName: 1}, {unique: 1});
var Permission = mongoose.model('Permission', permissionSchema);



module.exports = Permission;