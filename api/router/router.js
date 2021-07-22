const express = require('express');
const router = express.Router();

const ctrlProducts = require('../controllers/products');
const ctrlClients = require('../controllers/clients');

router.get('/index', ctrlProducts.getProducts);

router.get('/products', ctrlProducts.getProducts);
router.post('/products/getproduct', ctrlProducts.getOneProduct);
router.post('/products/addproduct', ctrlProducts.addProduct);
router.get('/products/deleteproduct', ctrlProducts.deleteProduct);
router.post('/products/updateproduct', ctrlProducts.updateProduct);


router.post('/clients', ctrlClients.setClients);

module.exports = router;
