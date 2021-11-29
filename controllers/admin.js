const formidable = require('formidable');
const FileAPI = require('file-api');
const FileReader = FileAPI.FileReader;
const axios = require('axios');

const config = require('../configs/config.json');

module.exports.getAdmin = function (req, res) {
    res.render('admin.pug');
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
                    console.log('Ошибка чтения файла ' + reader.error);
                    reject(reader.error);
                }
            })

            imagesBuffer.push(imageAsBuffer);
        }

        let images = await Promise.all(imagesBuffer)

        let data = {
            name: fields.name,
            price: fields.price,
            images: images,
            category: fields.category,
            rating: {
                roundedRating: 0, 
                realRating: 0,
                countOfVoters: 0
            }
        }
        
        axios({
            url: `http://92.53.105.229:${config.PORT}/api/products/addproduct`,
            method: "post",
            data: data
        }).then(
            response => {
                res.json(response.data);
            },
            err => {
                console.log('Ошибка ' + err.message);
                res.json(
                    err.response.data
                )
            }
        ).catch(
            err => {
                console.log('Ошибка ' + err.message);
            }
        )
    });
};

module.exports.updateProduct = function (req, res) {

    const form = new formidable.IncomingForm({
        multiple: true
    });

    form.parse(req, async (err, fields, files) => {

        let update = {};

        for (let item of Object.keys(fields)) {
            if (fields[item] !== '' && fields[item] !== undefined) update[item] = fields[item];
        }

        if (files.image.name == '') {

            axios({
                url: `http://92.53.105.229:${config.PORT}/api/products/updateproduct`,
                method: "post",
                data: update
            }).then(
                response => {
                    res.json(response.data);
                },
                err => {
                    console.log('Ошибка ' + err.message);
                    res.json(err.response.data)
                }
            ).catch(
                err => {
                    console.log('Ошибка ' + err.message);
                }
            )

            return;
        }

        const reader = new FileReader();

        reader.readAsArrayBuffer(files.image);

        reader.onload = function () {
            console.log(reader.result);

            update.image = reader.result;

            axios({
                url: `http://92.53.105.229:${config.PORT}/api/products/updateproduct`,
                method: "post",
                data: update
            }).then(
                response => {
                    res.json(response.data);
                },
                err => {
                    console.log('Ошибка ' + err.message);
                    res.json(err.response.data)
                }
            ).catch(
                err => {
                    console.log('Ошибка ' + err.message);
                }
            )
        };

    })
};