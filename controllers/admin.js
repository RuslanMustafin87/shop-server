const formidable = require('formidable');
const FileAPI = require('file-api');
const FileReader = FileAPI.FileReader;
const axios = require('axios');

const PORT = 3007;

module.exports.getAdmin = function (req, res) {
    res.render('admin.pug');
};

module.exports.addProduct = function (req, res) {

    const form = new formidable.IncomingForm({
        multiple: true
    });

    form.parse(req, (err, fields, files) => {

        const reader = new FileReader();

        reader.readAsArrayBuffer(files.image);

        reader.onload = function () {

            let data = {
                name: fields.name,
                price: fields.price,
                image: reader.result,
                category: fields.category
            }

            axios({
                url: `http://localhost:${PORT}/api/products/addproduct`,
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

        }

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
                url: `http://localhost:${PORT}/api/products/updateproduct`,
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
                url: `http://localhost:${PORT}/api/products/updateproduct`,
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