const express = require('express');
const router = express.Router();

const ctrlIndex = require('../controllers/index');
const ctrlProduct = require('../controllers/product');
const ctrlBasket = require('../controllers/basket');
const ctrlAdmin = require('../controllers/admin');

const methodsOfUser = require('../middlewares/methods-of-user')
const isAdmin = require('../middlewares/is-admin');
const pagination = require('../middlewares/pagination');

router.get('/', methodsOfUser.checkIsUser, ctrlIndex.getIndex);
router.post('/authuser', methodsOfUser.authUser, ctrlIndex.getIndex);

router.get('/product', methodsOfUser.checkIsUser, ctrlProduct.getProduct);
router.post('/product/authuser', methodsOfUser.authUser, ctrlProduct.getProduct);
router.put('/product/updateratingproduct', ctrlProduct.updateRatingProduct);

router.get('/basket', methodsOfUser.checkIsUser, ctrlBasket.getBasket);
router.post('/basket/authuser', methodsOfUser.authUser, ctrlBasket.getBasket);
router.post('/basket/getproducts', ctrlBasket.getProducts);
router.post('/basket/addorder', ctrlBasket.addOrder);

router.get('/admin', isAdmin, ctrlAdmin.getAdmin);
router.post('/admin/addproduct', isAdmin, ctrlAdmin.addProduct);
// router.post('/admin/addproduct', ctrlAdmin.addProduct);
router.put('/admin/updateproduct', isAdmin, ctrlAdmin.updateProduct);
router.post('/admin/authadmin', ctrlAdmin.authAdmin);

router.post('/user/adduser', methodsOfUser.validUser(), methodsOfUser.addUser);
router.get(/(\/\w*)?\/logout/, methodsOfUser.logoutUser);

module.exports = router;