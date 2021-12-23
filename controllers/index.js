const axios = require('axios');

const config = require('../configs/config.json');
const PORT = config.http.PORT;
const URL = config.http.URL;

module.exports.getIndex = function (req, res) {

    let formatter = new Intl.NumberFormat("ru", {
        style: 'currency',
        currency: 'RUB',
        useGrouping: true,
        maximumFractionDigits: 0
    });

    axios({
        url: `${URL}:${PORT}/api/index`,
        method: "get",
    }).then(
        response => {
            let data = response.data.map(item => {
                item.priceIntl = formatter.format(item.price);
                console.log( item.priceIntl);
                return item;
            });
            
            res.render('index.pug', {
                products: data
            })
        }
    ).catch(
        err => {
            console.log('Ошибка ' + err.message);
            res.render('error.pug', {
                message: err.response.data.message
            });
        }
    )
};