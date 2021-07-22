const express = require('express');
const router = express.Router();

const ctrlIndex = require('../controllers/index');
const ctrlProduct = require('../controllers/product');
const ctrlBasket = require('../controllers/basket');
const ctrlAdmin = require('../controllers/admin');

router.get('/', ctrlIndex.getIndex);

router.get('/product', ctrlProduct.getProduct);
router.post('/products/addproduct', ctrlProduct.addProduct);

router.get('/basket', ctrlBasket.getBasket);

router.get('/admin', ctrlAdmin.getAdmin);

module.exports = router;
