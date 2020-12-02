const mongoose = require('mongoose');

module.exports.getProducts = function (req, res) {
    const Model = mongoose.model('products');
    
    Model.find()
        .then(items => {

            if (!items.length) {
                res.status(404).json({

                })
            } else {
                res.status(200).json(items);
            }
        })
}