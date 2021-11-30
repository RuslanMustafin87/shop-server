const axios = require('axios');

const config = require('../configs/config.json');
const PORT = config.http.PORT;
const URL = config.http.URL;

module.exports.getIndex = function (req, res) {
    
    axios({
        url: `${URL}:${PORT}/api/index`,
        method: "get",
    }).then(
        response => {
            response.data.sort((a, b) => a.price - b.price);
            res.render('index.pug', {products: response.data});
        },
        err => {
            console.log('Ошибка ' + err.message);
            res.render('error.pug', {message: err.response.data.message});
        }
    ).catch(
        err => {
            console.log('Ошибка ' + err.message);
            res.render('error.pug', {message: err.response.data.message});
        }
    )
};