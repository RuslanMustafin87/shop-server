const express = require('express');
const router = express.Router();

const ctrlIndex = require('../controllers/index');
const ctrlProduct = require('../controllers/product');
const ctrlBasket = require('../controllers/basket');
const ctrlAdmin = require('../controllers/admin');

router.get('/', ctrlIndex.getIndex);

router.get('/product', ctrlProduct.getProduct);
router.put('/product/updateproduct', ctrlProduct.updateProduct);
router.put('/product/updateratingproduct', ctrlProduct.updateRatingProduct);

router.get('/basket', ctrlBasket.getBasket);

router.get('/admin', ctrlAdmin.getAdmin);
router.post('/admin/addproduct', ctrlAdmin.addProduct);
router.post('/admin/updateproduct', ctrlAdmin.updateProduct);

module.exports = router;
