const formidable = require('formidable');
const FileAPI = require('file-api');
const FileReader = FileAPI.FileReader;
const axios = require('axios');

module.exports.getProduct = function (req, res) {
    
    res.render('product.pug');
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
                image: reader.result
            }

            axios({
                url: 'http://localhost:3007/api/products/addproduct',
                method: "post",
                data: data
            }).then(
                response => {
                    res.json(response.data);
                },
                err => {
                    console.log('Ошибка ' + err.message);
                    res.json({
                        message: err.response.data.message
                    })
                }
            ).catch(
                err => {
                    console.log('Ошибка ' + err.message);
                }
            )

        }

    });
};