const axios = require('axios');

const config = require('../configs/config.json');
const PORT = config.http.PORT;
const URL = config.http.URL;

module.exports.getIndex = function (req, res) {
    
    axios({
        url: `${URL}:${PORT}/api/index`,
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
                message: `${err.response.data.message} ${err.code}`
            });
        }
    )
};