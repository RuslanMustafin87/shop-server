const express = require('express');
const router = express.Router();

const ctrlProducts = require('../controllers/products');
const ctrlOrders = require('../controllers/orders');

router.get('/index', ctrlProducts.getProducts);

router.get('/products', ctrlProducts.getProducts);
router.get('/products/getproduct', ctrlProducts.getOneProduct);
router.post('/products/addproduct', ctrlProducts.addProduct);
router.delete('/products/deleteproduct', ctrlProducts.deleteProduct);
router.post('/products/updateproduct', ctrlProducts.updateProduct);

router.post('/orders/addorder', ctrlOrders.addOrder);

module.exports = router;
