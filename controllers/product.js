const mongoose = require('mongoose');

module.exports.getProduct = function (req, res) {
    //log.info({ req: req }, 'start request');

    // res.set('Content-Security-Policy-Report-Only');
    res.render('product.pug');
    //log.info({ res: res }, 'done response');
};