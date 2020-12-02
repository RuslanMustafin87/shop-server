const express = require('express');
const router = express.Router();

const ctrlProducts = require('../controllers/products');

router.get('/products', ctrlProducts.getProducts);

module.exports = router;
