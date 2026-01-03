const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, getMyProducts, deleteProduct } = require('../controllers/productController');
const { protect, restaurant } = require('../middleware/authMiddleware');

router.route('/')
    .get(getProducts)
    .post(protect, restaurant, createProduct);

router.get('/my-products', protect, restaurant, getMyProducts);

router.route('/:id')
    .get(getProductById)
    .delete(protect, restaurant, deleteProduct);

module.exports = router;
