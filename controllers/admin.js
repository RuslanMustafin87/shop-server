const formidable = require('formidable');
const FileAPI = require('file-api');
const FileReader = FileAPI.FileReader;
const axios = require('axios');

const config = require('../configs/config.json');
const PORT = config.http.PORT;
const httpURL = config.http.URL;

class AuthError extends Error {
    constructor(status, ...params) {
        super(...params)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AuthError);
        }

        this.status = status;
    }
}

module.exports.getAdmin = async function (req, res) {
    try {
        let responseOrders = await axios({
            url: `${httpURL}:${PORT}/api/orders`,
            method: "get",
        })

        let orders = await responseOrders.data;

        let responseUsers = await axios({
            url: `${httpURL}:${PORT}/api/users`,
            method: "get",
        })

        let users = await responseUsers.data;

        res.render('admin.pug', {orders, users});

    } catch (err) {
        console.log('Ошибка ' + err.message);
        res.render('error.pug', {
            message: `${err.response.data.message}`
        });

    };

};

module.exports.authAdmin = async function (req, res) {
    console.log( 'auth' );
    try {
        let response = await axios({
            url: `${httpURL}:${PORT}/api/users/authuser`,
            method: "post",
            data: {
                email: req.body.email,
                password: req.body.password
            }
        })

        if (response.data.role === 'user') {
            throw new AuthError(403, 'Доступ запрещен');
        }

        req.session.isAdmin = true;
        res.redirect('/admin');

    } catch (err) {
        let url = new URL(req.headers.referer);

        if (err.response) {
            switch (err.response.status) {
                case 500:
                    return res.status(500).render('error.pug', err.response.data);
                case 401:
                case 404:
                    url.searchParams.set('msgLoginAdminError', err.response.data.message);
                    return res.status(err.response.status).redirect(url);
            }
        }

        if (err instanceof AuthError) {
            url.searchParams.set('msgLoginAdminError', err.message);
            return res.status(err.status).redirect(url);
        }

        res.status(500).json('Ошибка на сервере');
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
            res.status(500).json({
                message: `Ошибка чтения файла`
            });
        }

        let data = {
            name: fields.name,
            price: fields.price,
            images: images,
            category: fields.category,
        }

        axios({
                url: `${httpURL}:${PORT}/api/products/addproduct`,
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

        // if (fields.price) {
        //     let priceIntl = (+fields.price).toLocaleString('ru-RU', {
        //         style: 'currency',
        //         currency: 'RUB',
        //         useGrouping: true,
        //         maximumFractionDigits: 0,
        //         minimumFractionDigits: 0
        //     })

        //     update.priceIntl = priceIntl;
        // }

        if (files.image.name === '') {

            axios({
                    url: `${httpURL}:${PORT}/api/products/updateproduct`,
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
                    url: `${httpURL}:${PORT}/api/products/updateproduct`,
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