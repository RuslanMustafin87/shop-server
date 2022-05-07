const axios = require('axios');
const express = require('express');
const router = express.Router();
const {
    check
} = require('express-validator');

const ctrlIndex = require('../controllers/index');
const ctrlProduct = require('../controllers/product');
const ctrlBasket = require('../controllers/basket');
const ctrlAdmin = require('../controllers/admin');
const ctrlUsers = require('../controllers/users');

const config = require('../configs/config.json');
const httpPORT = config.http.PORT;
const httpURL = config.http.URL;

let validUser = [
    check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Не email адрес.'),
    check('password')
    .trim()
    .isLength({
        min: 6
    })
    .withMessage('Пароль должен содержать минимум 6 символов.')
    .matches(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/)
    .withMessage('Пароль должен содержать цифры и буквы в верхнем и нижнем регистре.')
]

function checkIsUser(req, res, next) {
    if (req.session.userName) {
        res.locals.userName = req.session.userName;
    }
    next()
}

async function authUser(req, res, next){
    
    try {
        let response = await axios({
            url: `${httpURL}:${httpPORT}/api/users/authuser`,
            method: "post",
            data: {
                email: req.body.email,
                password: req.body.password
            }
        })
        res.locals.userName = response.data.name;
        next();
    } catch (err) {
        let url = new URL(req.headers.referer);
        url.searchParams.set('msgLoginError', err.response.data.message);

        return res.status( err.response.status ).redirect(url);
    }
}

// TODO middleware для входа в админку
// TODO сделать выход пользователя
router.get('/', checkIsUser, ctrlIndex.getIndex);
router.post('/authuser', authUser, ctrlIndex.getIndex);

router.get('/product', checkIsUser, ctrlProduct.getProduct);
router.post('/product/authuser', authUser, ctrlProduct.getProduct);
router.put('/product/updateratingproduct', ctrlProduct.updateRatingProduct);

router.get('/basket', checkIsUser, ctrlBasket.getBasket);
router.post('/basket/authuser', authUser, ctrlBasket.getBasket);
router.post('/basket/getproducts', ctrlBasket.getProducts);
router.post('/basket/addorder', ctrlBasket.addOrder);

router.get('/admin', ctrlAdmin.getAdmin);
router.post('/admin/addproduct', ctrlAdmin.addProduct);
router.put('/admin/updateproduct', ctrlAdmin.updateProduct);
router.post('/admin/authadmin', ctrlAdmin.authAdmin);

router.post('/users/adduser', validUser, ctrlUsers.addUser);

module.exports = router;