var User = require('./../models/user.model');

module.exports = {
    createUser: createUser,
    findById: findById,
    findOne: findOne,
    findAll: findAll,
    updateById: updateById,
    updateByCondition: updateByCondition,
    deleteById: deleteById,
    groupByAndTotal: groupByAndTotal
}

function createUser(model){
    var user = new User(model);
    return user.save();
}
function findById(id) {
    {
        return User.findById(id);
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
        User.find(where)
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
    return User.findOne(condition, projection); // projection : 'name ...'
}
function updateById(id, userModel) {
    return User.findByIdAndUpdate(id, userModel);
}
function updateByCondition(condition, userModel) {
    return User.findOneAndUpdate(condition, userModel);
}

function deleteById(id) {
    return User.findByIdAndRemove(id);
}
function count(condition) {
    if (condition) {
        return count(condition);
    }
    return User.count({});
}
function groupByAndTotal(groupBy){
    return User.aggregate([
        {$group:{ _id: '$'+groupBy,total: {$sum: '$age'}},
    }]);
}