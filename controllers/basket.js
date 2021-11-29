const axios = require('axios');
const config = require('../configs/config.json');

module.exports.getBasket = function (req, res) {
    res.render('basket.pug');
};

module.exports.getImages = async function (req, res) {

    let listIds = req.body;
    let productPromises = [];

    listIds.forEach(function (item) {

        let product = new Promise(function (res, rej) {

            axios.get(`http://92.53.105.229:${config.PORT}/api/products/getproduct?id=${item.id}`)
                .then(
                    response => {
                        res(response.data);
                    }
                )
        });

        productPromises.push(product);
    })

    let products = await Promise.all(productPromises);
    
    products = products.map(function (product) {

        product.image = product.images[0];
        delete product.images;
        return product;
    })
    
    res.json(products);
}