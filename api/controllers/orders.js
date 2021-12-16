const mongoose = require('mongoose');

module.exports.addProduct = function (req, res) {
    const Product = mongoose.model('products');

    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        images: req.body.images,
        category: req.body.category,
        rating: req.body.rating,
    });

    product.save()
        .then(
            product => {
                res.status(201).json({
                    message: 'Товар добавлен'
                });
            },
            err => {
                res.status(404).json({
                    message: 'Ошибка при добавлении товара'
                });
            }
        );
}