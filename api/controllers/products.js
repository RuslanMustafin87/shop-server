const mongoose = require('mongoose');

module.exports.getProducts = function (req, res) {
    const Product = mongoose.model('products');

    Product
        .find()
        .sort( {price: 1} )
        .then(
            items => {

                if (!items.length) {
                    res.status(404).json({})
                } else {
                    res.status(200).json(items);
                }
            }, )
        .catch(
            err => {
                console.error('Ошибка в БД ' + err.message);
                res.status(404).json({
                    message: `Ошибка в БД ${err.message}`
                });
            }
        )
}

class CustomError extends Error {
    constructor(code, status, ...params){
        super(...params)
        // if (Error.captureStackTrace) {
        //     Error.captureStackTrace(this, CustomError);
        // }

        this.code = code;
        this.status = status;
    }
}

// TODO обработа ошибок для поиска товара(для начала)
module.exports.getOneProduct = function (req, res) {
    const Product = mongoose.model('products');

    Product
        .findOne({
            _id: req.query.id
        })
        .then(
            item => {
                if (!item) {
                    throw new CustomError('generic', 404, 'Товар не найден');
                }
                res.status(200).json(item);
            },
        )
        .catch(
            err => {
                console.log( err.status, err.message);
                res.status(err.status).json({
                    message: err.message
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
        category: req.body.category,
        rating: req.body.rating,
    });

    product
        .save()
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

    Product
        .findByIdAndDelete(req.query.id, (err) => {
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

    Product
        .findByIdAndUpdate(req.body.id, req.body, (err) => {
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