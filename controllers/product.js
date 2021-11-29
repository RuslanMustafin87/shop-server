const axios = require('axios');
const config = require('../configs/config.json');

module.exports.getProduct = function (req, res) {

    axios({
        url: `http://92.53.105.229:${config.config.PORT}/api/products/getproduct?id=${req.query.id}`,
        method: 'GET',
    }).then(
        response => {
            res.render('product.pug', response.data);
        },
        err => {
            console.log('Ошибка в БД не найдена ' + err.message);
            res.render('error.pug', {
                message: `${err.response.data.message} ${err.message}`
            });
        }
    ).catch(
        err => {
            console.log('Ошибка в данных ' + err.message);
            res.render('error.pug', {
                message: `Ошибка в данных: ${err.message}`
            });
        }
    )

};

module.exports.updateProduct = function (req, res) {

    let data = req.body;

    axios({
        url: `http://92.53.105.229:${config.config.PORT}/api/products/updateproduct`,
        method: 'post',
        data: data
    }).then(
        response => {

            console.log(response.data);

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

module.exports.updateRatingProduct = function (req, res) {

    axios({
        url: `http://92.53.105.229:${config.PORT}/api/products/getproduct?id=${req.body.id}`,
    }).then(
        response => {
            return response.data;
        },
    ).then(
        data => {
            
            let realRating = +((data.rating.realRating * data.rating.countOfVoters + req.body.rating) / (data.rating.countOfVoters + 1)).toFixed(2);

            let roundedRating = Math.round(realRating);

            let body = Object.assign(req.body, {
                rating: {
                    roundedRating,
                    realRating,
                    countOfVoters: ++data.rating.countOfVoters,
                }
            });

            return axios({
                url: `http://92.53.105.229:${config.PORT}/api/products/updateproduct`,
                method: 'post',
                data: body
            })
        },
    ).then(
        response => {
            console.log(response.data.message);
            res.status(200).json(response.data);
        }
    ).catch(
        err => {
            console.log('Ошибка ' + err.message);
            // res.json(
            //     err.response.data
            // )
        }
    )
}