const mongoose = require('mongoose');

module.exports.getProducts = function (req, res) {
    const Product = mongoose.model('products');

    Product.find()
        .then(
            items => {

                if (!items.length) {
                    res.status(404).json({})
                } else {
                    res.status(200).json(items);
                }
            })
}

module.exports.getOneProduct = function (req, res) {
    const Product = mongoose.model('products');
    
    Product.findOne({
            _id: req.query.id
        })
        .then(
            item => {
                if (!item) {
                    res.status(404).json({
                        status: 'Товар не найден'
                    })
                } else {
                    res.status(200).json(item);
                }
            },
            err => {
                res.status(404).json({
                    status: 'Товар не найден'
                })
            }
        )
}

module.exports.addProduct = function (req, res) {
    const Product = mongoose.model('products');

    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        images: req.body.images,
        category: req.body.category
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

module.exports.deleteProduct = function (req, res) {
    const Product = mongoose.model('products');
    
    Product.findByIdAndDelete(req.query.id, (err) => {
        if (err) {
            res.status(404).json({
                message: "Нет такого товара"
            });
            return;
        }

        res.status(201).json({
            message: "Товар удален"
        })
    });
}

module.exports.updateProduct = function (req, res) {
    const Product = mongoose.model('products');

    Product.findByIdAndUpdate(req.body.id, req.body, (err) => {
        if (err) {
            res.status(404).json({
                message: 'Ошибка обновления продукта'
            });
            return;
        };

        res.status(201).json({
            message: 'Товар обновлен'
        });
    })

}