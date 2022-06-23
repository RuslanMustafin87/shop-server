const express = require('express');
const router = express.Router();

const ctrlProducts = require('../controllers/products');
const ctrlOrders = require('../controllers/orders');
const ctrlUsers = require('../controllers/users');

// router.get('/index', ctrlProducts.getProducts);

router.get('/products', ctrlProducts.getProducts);
router.get('/products/getproduct', ctrlProducts.getOneProduct);
router.post('/products/addproduct', ctrlProducts.addProduct);
router.delete('/products/deleteproduct', ctrlProducts.deleteProduct);
router.put('/products/updateproduct', ctrlProducts.updateProduct);

router.get('/orders', ctrlOrders.getOrders);
router.post('/orders/addorder', ctrlOrders.addOrder);

router.get('/users', ctrlUsers.getUsers);
router.post('/users/adduser', ctrlUsers.addUser);
router.post('/users/authuser', ctrlUsers.authUser);

module.exports = router;
