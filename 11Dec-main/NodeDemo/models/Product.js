const Product = require('../schema/Product');

module.exports = {
    getAll: function (query) {
        const sort = {};
        const search = {};

        if (query.sort) {
            sort[query.sort.startsWith('-') ? query.sort.substring(1) : query.sort] = query.sort.startsWith('-') ? 'desc' : 'asc';
        }

        if (query.key) {
            search.name = new RegExp(query.key, 'i');
        }

        const limit = parseInt(query.limit) || 2;
        const page = parseInt(query.page) || 1;
        const skip = (page - 1) * limit;

        return Product.find(search)
            .select('name description image price')
            .sort(sort)
            .limit(limit)
            .skip(skip)
            .exec();
    },
    getOne: function (id) {
        return Product.findById(id);
    },
    createProduct: function (product) {
        return new Product(product).save();
    }
};
