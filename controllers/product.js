const axios = require('axios');
const config = require('../configs/config.json');
const PORT = config.http.PORT;
const URL = config.http.URL;

module.exports.getProduct = function (req, res) {

    axios({
        url: `${URL}:${PORT}/api/products/getproduct?id=${req.query.id}`,
        method: 'GET',
    })
    .then(
        response => res.render('product.pug', response.data)
    )
    .catch(
        err => {
            console.log('Ошибка в данных ' + err.message);
            res.render('error.pug', {
                message: `${err.response.data.message}`
            });
        }
    )

};

module.exports.authUser = async function (req, res) {
    let data = {};

    try {
        let response = await axios({
            url: `${URL}:${PORT}/api/users/authuser`,
            method: "post",
            data: {
                email: req.body.email,
                password: req.body.password
            }
        })
        data.userName = response.data.name
    } catch (err) {
        return res.status( err.response.status ).redirect(`/product?msgLoginError=${err.response.data.message}`)
    }

    try {
        let response = await axios({
            url: `${URL}:${PORT}/api/products/getproduct?id=${req.query.id}`,
            method: "get",
        })
        Object.assign(data, response.data);
    } catch (err) {
        return res.render('error.pug', {
            message: `${err.response.data.message}`
        });
    }

    res.render('product.pug', data);
};

module.exports.updateRatingProduct = function (req, res) {

    axios({
        url: `${URL}:${PORT}/api/products/getproduct?id=${req.body.id}`,
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
                url: `${URL}:${PORT}/api/products/updateproduct`,
                method: 'put',
                data: body
            })
        },
    ).then(
        response => res.status(200).json(response.data)
    ).catch(
        err => {
            // TODO пробросить ошибку или нет если путь не доступен
            console.log('Ошибка ' + err.message);
            res.status(500).json(err.response.data);
        }
    )
}