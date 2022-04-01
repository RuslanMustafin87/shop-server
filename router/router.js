const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const ctrlIndex = require('../controllers/index');
const ctrlProduct = require('../controllers/product');
const ctrlBasket = require('../controllers/basket');
const ctrlAdmin = require('../controllers/admin');
const ctrlUsers = require('../controllers/users');

let validUser = [
    check('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('Не email адрес.'),
    check('password')
        .trim()
        .isLength({min: 6})
        .withMessage('Пароль должен содержать минимум 6 символов.')
        .matches(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/)
        .withMessage('Пароль должен содержать цифры и буквы в верхнем и нижнем регистре.')
]

router.get('/', ctrlIndex.getIndex);

router.get('/product', ctrlProduct.getProduct);
// router.put('/product/updateproduct', ctrlProduct.updateProduct);
router.put('/product/updateratingproduct', ctrlProduct.updateRatingProduct);

router.get('/basket', ctrlBasket.getBasket);
router.post('/basket/getproducts', ctrlBasket.getProducts);
router.post('/basket/addorder', ctrlBasket.addOrder);

router.get('/admin', ctrlAdmin.getAdmin);
router.post('/admin/addproduct', ctrlAdmin.addProduct);
router.put('/admin/updateproduct', ctrlAdmin.updateProduct);

router.post('/users/adduser', validUser, ctrlUsers.addUser);
router.post('/users/validuser', ctrlUsers.validUser);

module.exports = router;
