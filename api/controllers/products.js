const mongoose = require('mongoose');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

module.exports.getProducts = function (req, res) {
    const Product = mongoose.model('products');

    Product.find()
        .then(items => {

            if (!items.length) {
                res.status(404).json({

                })
            } else {
                res.status(200).json(items);
            }
        })
}

module.exports.getOneProduct = function (req, res) {
    const Product = mongoose.model('products');

    Product.findOne({
            _id: req.body.id
        })
        .then(item => {
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

    const form = new formidable.IncomingForm({
        multiple: true
    });
    const upload = 'public/assets/images';

    form.uploadDir = path.join(process.cwd(), upload);

    form.parse(req, (err, fields, files) => {
        let fileName = path.join(upload, files.image.name)
        fs.rename(files.image.path, fileName, () => {
            res.json({
                status: 200
            });
        });

        let product = new Product({
            name: fields.name,
            price: fields.price,
            background: fields.bg,
        })

        product.save()
            .then(
                product => {
                    res.status(201).json({
                        status: 'Товар добавлен'
                    });
                },
                err => {
                    res.status(404).json({
                        status: 'Ошибка при добавлении товара'
                    });
                }
            )
    })
}

module.exports.deleteProduct = function (req, res) {
    const Product = mongoose.model('products');

    Product.findByIdAndDelete(req.query.id, function (err) {
        if (err) return res.json({
            status: "Нет такого товара"
        })

        res.status(201).json({
            status: "Товар удален"
        })
    });
}

module.exports.updateProduct = function (req, res) {
    const Product = mongoose.model('products');

    const form = new formidable.IncomingForm({
        multiple: true
    });

    form.parse(req, (err, fields, files) => {

        let update = {};

        for (let item of Object.keys(fields)){
            if (fields[item] !== '') update[item] = fields[item];
        }

        console.log(update);
        Product.findByIdAndUpdate(fields.id, update, (err)=>{
            if (err) res.json({status: 'Ошибка обновленпия продукта'});

            res.json({status: 'Товар обновлен'});
        })
    })
}