const express = require('express');
const router = express.Router();

const ctrlIndex = require('../controllers/index');
const ctrlHome = require('../controllers/home');

router.get('/', ctrlIndex.getIndex);
router.post('/', ctrlIndex.authHome);

router.post('/signin', ctrlIndex.signIn);

router.get('/home', ctrlHome.getHome);

module.exports = router;
