const { body } = require('express-validator');
const message = require('../helper/message');
const util = require('util');

const options = {
    name: {
        min: 10,
        max: 80
    },
    description: {
        min: 10,
        max: 80
    },
    price: {
        min: 0 
    }
};

module.exports = {
    validator: function () {
        return [
            body('name', util.format(message.size_string_message, 'name',
                options.name.min, options.name.max)).isLength(options.name),
            body('description', util.format(message.size_string_message, 'description',
                options.description.min, options.description.max)).isLength(options.description),
            body('image', 'image  phai dung dinh dang').isURL(),
            body('price', 'price phai la so khong am').isNumeric().isInt({ min: options.price })
        ];
    },
};
