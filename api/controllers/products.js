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
        // .populate('category')
        // .exec()
        .then(
            products => {
                if (!products.length) throw new ProductError('generic', 404, 'Данные не найдены');
                res.status(200).json(products);
            }, )
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

// TODO обработа ошибок для поиска товара(для начала)
module.exports.getOneProduct = function (req, res) {
    const Product = mongoose.model('products');
    console.log( req.query.id );
    Product
        .findOne({
            _id: req.query.id
        })
        // .populate('category')
        .then(
            product => {
                console.log( product );
                // if (!product) throw new ProductError('generic', 404, 'Товар не найден');
                res.status(200).json(product);
            },
            err => {
                console.log( 'ji' );
                throw new ProductError('generic', 404, 'Товар не найден');
            }
        )
        .catch(
            err => {
                console.log( err instanceof ProductError );
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
    const Furniture = mongoose.model('furnitures');

    // let product = new Product({
    //     name: req.body.name,
    //     price: req.body.price,
    //     priceIntl: req.body.priceIntl,
    //     images: req.body.images,
    //     // category: req.body.category,
    //     rating: req.body.rating,
    // });

    Furniture
        .findOne({furniture: req.body.category})
        .then(
            furniture => {
                let product = new Product({
                    name: req.body.name,
                    price: req.body.price,
                    priceIntl: req.body.priceIntl,
                    images: req.body.images,
                    category: furniture._id,
                    rating: req.body.rating,
                });
                return product.save()
            }
        )
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