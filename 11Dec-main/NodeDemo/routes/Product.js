const express = require('express');
const router = express.Router();
const responseData = require('../helper/responseData');
const Product = require('../models/Product');
var validate = require('../validates/Product')
const { validationResult } = require('express-validator');

router.get('/', async function (req, res, next) {
  try {
    const products = await Product.getAllProducts(req.query);
    responseData.responseReturn(res, 200, true, products);
  } catch (error) {
    responseData.responseReturn(res, 500, false, "Internal Server Error");
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    responseData.responseReturn(res, 200, true, product);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "Product not found");
  }
});

router.post('/add' ,validate.validator(),async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseData.responseReturn(res, 400, false, errors.array().map(error => error.msg));
      return;
    }

    const newProduct = await Product.createProduct({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price
    });
    
    responseData.responseReturn(res, 200, true, newProduct);
  } catch (error) {
    responseData.responseReturn(res, 500, false, "Internal Server Error");
  }
});

router.put('/edit/:id', async function (req, res, next) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    responseData.responseReturn(res, 200, true, product);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "Product not found");
  }
});

router.delete('/delete/:id', async function (req, res, next) {
  try {
    await Product.findByIdAndDelete(req.params.id);
    responseData.responseReturn(res, 200, true, "Delete thanh cong");
  } catch (error) {
    responseData.responseReturn(res, 404, false, "Product not found");
  }
});

module.exports = router;
