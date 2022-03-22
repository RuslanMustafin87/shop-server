const formidable = require('formidable');
const axios = require('axios');

const config = require('../configs/config.json');
const PORT = config.http.PORT;
const URL = config.http.URL;

module.exports.validUser = function (req, res) {

    axios({
            url: `${URL}:${PORT}/api/users/validuser`,
            method: "post",
            data: {
                login: req.body.login,
                password: req.body.password
            }
        })
        .then(
            response => {
                console.log('oi');
                res.redirect('/admin');
            }
        )
        .catch(
            err => {
                console.log('Ошибка! ' + err.message);
                // res.json({
                //     message: `${err.response.data.message}`
                // })
                res.redirect(`/?msg=${err.response.data.message}`);
            }
        )
}