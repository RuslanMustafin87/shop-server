const mongoose = require('mongoose');

class ProductError extends Error {
    constructor(code, status, ...params) {
        super(...params)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }

        this.code = code;
        this.status = status;
    }
}

module.exports.getProducts = function (req, res) {
    const Product = mongoose.model('products');

    Product
        .find()
        .sort({
            price: 1
        })
        .then(
            products => {
                if (!products.length) throw new ProductError('generic', 404, 'Данные не найдены');
                res.status(201).json(products);
            }, )
        .catch(
            err => {
                if (err instanceof ProductError) {
                    return res.status(404).json({
                        message: err.message
                    });
                }
                res.status(500).json({
                    message: 'Ошибка на сервере'
                });
            }
        )
}

// TODO обработа ошибок для поиска товара(для начала)
module.exports.getOneProduct = function (req, res) {
    const Product = mongoose.model('products');

    Product
        .findOne({
            _id: req.query.id
        })
        .then(
            product => {
                if (!product) throw new ProductError('generic', 404, 'Товар не найден');
                res.status(200).json(product);
            },
        )
        .catch(
            err => {
                if (err instanceof ProductError) {
                    return res.status(err.status).json({
                        message: err.message
                    });
                }
                res.status(500).json({
                    message: 'Ошибка на сервере'
                });
            }
        )

}

module.exports.addProduct = function (req, res) {
    const Product = mongoose.model('products');

    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        priceIntl: req.body.priceIntl,
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
            }
        )
        .catch(
            err => {
                res.status(500).json({
                    message: 'Ошибка на сервере'
                });
            }
        )
}

module.exports.deleteProduct = function (req, res) {
    const Product = mongoose.model('products');

    Product
        .findByIdAndDelete(req.query.id)
        .then(
            product => {
                if (!product) throw new ProductError('generic', 404, 'Товар не найден');
                res.status(201).json({
                    message: 'Товар удален'
                });
            }
        )
        .catch(
            err => {
                if (err instanceof ProductError) {
                    return res.status(err.status).json({
                        message: err.message
                    });
                }
                res.status(500).json({
                    message: 'Ошибка удаления продукта'
                });
            })
}

module.exports.updateProduct = function (req, res) {
    const Product = mongoose.model('products');
    console.log(req.body.id);
    Product
        .findByIdAndUpdate(req.body.id, req.body)
        .then(
            product => {
                // console.log(product);
                if (!product) throw new ProductError('generic', 404, 'Товар не найден');
                res.status(201).json({
                    message: 'Товар обновлен'
                });
            }
        )
        .catch(
            err => {
                if (err instanceof ProductError) {
                    return res.status(err.status).json({
                        message: err.message
                    });
                }
                res.status(500).json({
                    message: 'Ошибка обновления продукта'
                });
            })
}