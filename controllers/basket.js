const axios = require('axios');

const config = require('../configs/config.json');
const PORT = config.http.PORT;
const URL = config.http.URL;

module.exports.getBasket = function (req, res) {
    res.render('basket.pug');
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