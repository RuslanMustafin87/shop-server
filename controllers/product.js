const axios = require('axios');
const config = require('../configs/config.json');
const PORT = config.http.PORT;
const httpURL = config.http.URL;

module.exports.getProduct = function (req, res) {

    axios({
        url: `${httpURL}:${PORT}/api/products/getproduct?id=${req.query.id}`,
        method: 'GET',
    })
    .then(
        response => res.render('product.pug', response.data)
    )
    .catch(
        err => {
            console.log('Ошибка данных ' + err.message);
            res.render('error.pug', {
                message: `${err.response.data.message}`
            });
        }
    )

};

module.exports.updateRatingProduct = function (req, res) {

    axios({
        url: `${httpURL}:${PORT}/api/products/getproduct?id=${req.body.id}`,
    }).then(
        response => {
            return response.data;
        },
    ).then(
        data => {
            let realRating = +((data.rating.realRating * data.rating.countOfVoters + +req.body.rating) / (data.rating.countOfVoters + 1)).toFixed(2);

            let body = Object.assign(req.body, {
                rating: {
                    realRating,
                    countOfVoters: ++data.rating.countOfVoters,
                }
            });

            return axios({
                url: `${httpURL}:${PORT}/api/products/updateproduct`,
                method: 'put',
                data: body
            })
        },
    ).then(
        response => res.status(200).json(response.data)
    ).catch(
        err => {
            res.status(500).json(err.response.data);
        }
    )
}