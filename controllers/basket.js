const axios = require('axios');

const config = require('../configs/config.json');
const PORT = config.http.PORT;
const URL = config.http.URL;

module.exports.getBasket = async function (req, res) {

    let listIds = req.query;
    console.log( listIds );
    let listOfProductPromises = [];

    Object.values( listIds ).forEach(function (item, index) {

        let productPromise = new Promise(function (res, rej) {

            axios.get(`${URL}:${PORT}/api/products/getproduct?id=${item}`)
                .then(
                    response => {
                        res(response.data);
                    },
                    err => {
                        rej(err);
                    }
                )
        });

        listOfProductPromises.push( productPromise);
    })

    let products = [];

    try {
        products = await Promise.all( listOfProductPromises );
    }  catch(err) {
        console.log(err);
    }

    if ( products.length > 0 ) {
        console.log( products.length );
    };

    res.render('basket.pug', {products: products});
};

module.exports.getImages = async function (req, res) {

    let listIds = req.body;
    let productPromises = [];

    listIds.forEach(function (item) {

        let product = new Promise(function (res, rej) {

            axios.get(`${URL}:${PORT}/api/products/getproduct?id=${item.id}`)
                .then(
                    response => {
                        res(response.data);
                    },
                    err => {
                        rej(err);
                    }
                )
        });

        productPromises.push(product);
    })

    let products = [];

    try {
        products = await Promise.all(productPromises);
    }  catch(err) {
        console.log(err);
    }

    products = products.map(function (product) {
        product.image = product.images[0];
        delete product.images;
        return product;
    })

    res.json(products);
}