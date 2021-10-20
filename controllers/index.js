const axios = require('axios');

const PORT = 3007;

module.exports.getIndex = function (req, res) {
    
    axios({
        url: `http://localhost:${PORT}/api/index`,
        method: "get",
    }).then(
        response => {
            response.data.sort((a, b) => a.price - b.price);
            res.render('index.pug', {products: response.data});
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
};