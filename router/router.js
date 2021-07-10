const express = require('express');
const router = express.Router();

const ctrlIndex = require('../controllers/index');
const ctrlProduct = require('../controllers/product');

router.get('/', ctrlIndex.getIndex);
router.get('/product', ctrlProduct.getProduct);

router.post('/signin', ctrlIndex.signIn);

module.exports = router;
