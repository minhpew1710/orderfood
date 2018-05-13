var Category = require('../models/category.model');

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

function createCategory(model){
    var category = new Category(model);
    return category.save();
}
function findById(id) {
    {
        return Category.findById(id);
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
        Category.find(where)
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
    return Category.findOne(condition, projection); // projection : 'name ...'
}
function updateById(id, categoryModel) {
    return Category.findByIdAndUpdate(id, categoryModel);
}
function updateByCondition(condition, categoryModel) {
    return Category.findOneAndUpdate(condition, categoryModel);
}

function deleteById(id) {
    return Category.findByIdAndRemove(id);
}
function count(condition) {
    if (condition) {
        return count(condition);
    }
    return Category.count({});
}
function groupByAndTotal(groupBy){
    return Category.aggregate([
        {$group:{ _id: '$'+groupBy,total: {$sum: '$age'}},
    }]);
}