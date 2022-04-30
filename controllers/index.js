const axios = require('axios');

const config = require('../configs/config.json');
const PORT = config.http.PORT;
const URL = config.http.URL;

module.exports.getIndex = function (req, res) {

    axios({
            url: `${URL}:${PORT}/api/products`,
            method: "get",
        })
        .then(
            response => {
                res.render('index.pug', {
                    products: response.data
                })
            }
        )
        .catch(
            err => {
                console.log('Ошибка ' + err.message);
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
        return res.status( err.response.status ).redirect(`/?msgLoginError=${err.response.data.message}`)
    }

    try {
        let response = await axios({
            url: `${URL}:${PORT}/api/products`,
            method: "get",
        })
        data.products = response.data
    } catch (err) {
        return res.render('error.pug', {
            message: `${err.response.data.message}`
        });
    }

    res.render('index.pug', data);
};