const formidable = require('formidable');
const FileAPI = require('file-api');
const FileReader = FileAPI.FileReader;
const axios = require('axios');

const config = require('../configs/config.json');
const PORT = config.http.PORT;
const URL = config.http.URL;

module.exports.getAdmin = function (req, res) {
    res.render('admin.pug');
};

module.exports.authAdmin = async function (req, res) {
    let data = {};

    try {
        let response = await axios({
            url: `${URL}:${PORT}/api/users/authuser`,
            method: "post",
            data: {
                email: req.body.email,
                password: req.body.password
            }
        })

        if ( !response.data.role === 'admin' ) throw new Error('Доступ запрещен');

        data.userName = response.data.name
        res.render('basket.pug', data);
    } catch (err) {
        if (err.response.status === 500) return res.status( err.response.status ).render('error.pug', `/?msgLoginError=${err.response.data.message}`);
        res.status( 403 ).redirect(`/?msgLoginError=Доступ зарещен`);
    }

};


module.exports.addProduct = function (req, res) {

    const form = new formidable.IncomingForm({
        multiple: true
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return new Error('Ошибка чтения формы при добавлении товара ' + err.message);
        }

        let imagesBuffer = [];

        let imageFiles = Object.values(files);

        for (let i = 0; i < imageFiles.length; i++) {
            const imageAsBuffer = new Promise(function (resolve, reject) {
                const reader = new FileReader();

                reader.readAsArrayBuffer(imageFiles[i]);

                reader.onload = function () {
                    resolve(reader.result);
                }

                reader.onerror = function () {
                    reject(reader.error);
                }
            })

            imagesBuffer.push(imageAsBuffer);
        }

        let images;

        try {
            images = await Promise.all(imagesBuffer)
        } catch (err) {
            console.log('Ошибка чтения файла ' + err);
            res.status(500).json({ message: `Ошибка чтения файла` });
        }

        let priceIntl = (+fields.price).toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            useGrouping: true,
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        })

        let data = {
            name: fields.name,
            price: fields.price,
            priceIntl: priceIntl,
            images: images,
            category: fields.category,
            rating: {
                roundedRating: 0,
                realRating: 0,
                countOfVoters: 0
            }
        }

        axios({
                url: `${URL}:${PORT}/api/products/addproduct`,
                method: "post",
                data: data
            })
            .then(
                response => res.status(response.status).json(response.data)
            )
            .catch(
                err => {
                    console.log(`Ошибка ${err.status} ${err.message}`);
                    res.status(err.status).json(
                        err.response.data
                    )
                }
            )
    });
};

// TODO переписать функцию
module.exports.updateProduct = function (req, res) {

    const form = new formidable.IncomingForm({
        multiple: true
    });

    form.parse(req, async (err, fields, files) => {

        let update = {};

        for (let item of Object.keys(fields)) {
            if (fields[item] !== undefined) update[item] = fields[item];
        }

        if ( fields.price){
            let priceIntl = (+fields.price).toLocaleString('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                useGrouping: true,
                maximumFractionDigits: 0,
                minimumFractionDigits: 0
            })

            update.priceIntl = priceIntl;
        }

        if (files.image.name === '') {

            axios({
                    url: `${URL}:${PORT}/api/products/updateproduct`,
                    method: "put",
                    data: update
                })
                .then(
                    response => res.status(response.status).json(response.data)
                )
                .catch(
                    err => {
                        console.log(err.response.data.message + ' ' + err.response.status);
                        res.status(err.response.status).json(err.response.data);
                    }
                )

            return;
        }

        const reader = new FileReader();

        reader.readAsArrayBuffer(files.image);

        reader.onload = function () {

            update.images = reader.result;

            axios({
                url: `${URL}:${PORT}/api/products/updateproduct`,
                method: "post",
                data: update
            })
            .then(
                response => res.status(response.status).json(response.data)
                )
            .catch(
                err => {
                    console.log(err.response.data.message + ' ' + err.response.status);
                    res.status(err.response.status).json(err.response.data);
                }
            )
        };

    })
};