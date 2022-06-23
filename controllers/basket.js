const axios = require('axios');
// const nodemailer = require('nodemailer');

const config = require('../configs/config.json');
const PORT = config.http.PORT;
const URL = config.http.URL;

module.exports.getBasket = async function (req, res) {
    res.render('basket.pug');
};

module.exports.getProducts = async function (req, res) {

    let listIds = req.body;
    let productPromises = [];

    listIds.forEach(function (item) {

        let product = new Promise(function (res, rej) {

            axios.get(`${URL}:${PORT}/api/products/getproduct?id=${item.id}`)
                .then(
                    response => res(response.data),
                    err => rej(err)
                )
        });

        productPromises.push(product);
    })

    let products = [];

    try {
        products = await Promise.all(productPromises);
    } catch (err) {
        console.log(err);
    }

    products = products.map(function (product) {
        product.image = product.images[0];
        delete product.images;
        return product;
    })

    res.json(products);
}

module.exports.addOrder = async function (req, res) {
    // let testAccount = await nodemailer.createTestAccount();

    axios.post(`${URL}:${PORT}/api/orders/addorder`, req.body)
        .then(
            response => res.json(response.data)
        )
        .catch(
            err => res.status(500).json(err.response.data)
        )
    // TODO исправить отправку письма, крашит сервер
    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     host: "smtp.gmail.com",
    //     port: 465,
    //     secure: true, // true for 465, false for other ports
    //     auth: {
    //         user: 'rostislavmustafin87@gmail.com', // generated ethereal user
    //         pass: 'jWYeCCr77hD3', // generated ethereal password
    //     },
    // });

    // let info = await transporter.sendMail({
    //     from: "Fred Foo 👻" , // sender address
    //     to: "ruslanmust87@gmail.com", // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     text: "Hello world?", // plain text body
    // });
}
