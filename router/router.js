const express = require('express');
const router = express.Router();

const ctrlIndex = require('../controllers/index');
const ctrlProduct = require('../controllers/product');
const ctrlBasket = require('../controllers/basket');
const ctrlAdmin = require('../controllers/admin');

const methodsOfUser = require('../middlewares/methods-of-user')

// TODO middleware для входа в админку
// TODO сделать выход пользователя
router.get('/', methodsOfUser.checkIsUser, ctrlIndex.getIndex);
router.post('/authuser', methodsOfUser.authUser, ctrlIndex.getIndex);

router.get('/product', methodsOfUser.checkIsUser, ctrlProduct.getProduct);
router.post('/product/authuser', methodsOfUser.authUser, ctrlProduct.getProduct);
router.put('/product/updateratingproduct', ctrlProduct.updateRatingProduct);

router.get('/basket', methodsOfUser.checkIsUser, ctrlBasket.getBasket);
router.post('/basket/authuser', methodsOfUser.authUser, ctrlBasket.getBasket);
router.post('/basket/getproducts', ctrlBasket.getProducts);
router.post('/basket/addorder', ctrlBasket.addOrder);

router.get('/admin', ctrlAdmin.getAdmin);
router.post('/admin/addproduct', ctrlAdmin.addProduct);
router.put('/admin/updateproduct', ctrlAdmin.updateProduct);
router.post('/admin/authadmin', ctrlAdmin.authAdmin);

router.post('/users/adduser', methodsOfUser.validUser(), methodsOfUser.addUser);

module.exports = router;