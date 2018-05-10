var Permission = require('../models/permission.model');

module.exports = {
    createPermission: createPermission,
    findById: findById,
    findOne: findOne,
    findAll: findAll,
    updateById: updateById,
    updateByCondition: updateByCondition,
    deleteById: deleteById
}

function createPermission(model){
    var permission = new Permission(model);
    return permission.save();
}
function findById(id) {
    {
        return Permission.findById(id);
    }
}
function findAll(condition, _skip, _limit, _projection, _sortBy, isDes) {
    var projection = _projection ? _projection : "";
    var skip = _skip ? (_skip > 0 ? _skip : 0) : 0;
    var limit = _limit ? (_limit > 0 ? _limit : 0) : 0;
    var sort = isDes ? "-" + _sortBy : _sortBy;
    var sortBy = _sortBy;
    var where = condition ? condition : {};
    return new Promise(function (resolve, reject) {
        Permission.find(where)
            .limit(limit)
            .sort(sort)
            .select(_projection)
            .exec(function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
    });
}

function findOne(condition, projection) {
    return Permission.findOne(condition, projection); // projection : 'name ...'
}
function updateById(id, permissionModel) {
    return Permission.findByIdAndUpdate(id, permissionModel);
}
function updateByCondition(condition, permissionModel) {
    return Permission.findOneAndUpdate(condition, permissionModel);
}

function deleteById(id) {
    return Permission.findByIdAndRemove(id);
}
function count(condition) {
    if (condition) {
        return count(condition);
    }
    return Permission.count({});
}
function groupByAndTotal(groupBy){
    return Permission.aggregate([
        {$group:{ _id: '$'+groupBy,total: {$sum: '$age'}},
    }]);
}