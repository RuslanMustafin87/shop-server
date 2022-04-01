const formidable = require('formidable');
const axios = require('axios');
const { validationResult } = require('express-validator');

const config = require('../configs/config.json');
const PORT = config.http.PORT;
const URL = config.http.URL;

module.exports.addUser = function (req, res) {

    const validErrors = validationResult(req);

    if ( !validErrors.isEmpty() ) {
        let errStr = validErrors.array({ onlyFirstError: true }).map( ( err ) => err.msg ).join(' ');
        return res.status(400).redirect(`/?msg=${errStr}`);
    }

    axios({
            url: `${URL}:${PORT}/api/users/adduser`,
            method: "post",
            data: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        })
        .then(
            response => {
                res.status( response.status ).redirect('/')
            }
        )
        .catch(
            err => {
                console.log('Ошибка!' + err.message);
                res.status(err.response.status).redirect(`/?msg=${err.response.data.message}`);
            }
        )
}

module.exports.validUser = function (req, res) {

    axios({
            url: `${URL}:${PORT}/api/users/validuser`,
            method: "post",
            data: {
                email: req.body.email,
                password: req.body.password
            }
        })
        .then(
            response => {
                res.redirect('/admin');
            }
        )
        .catch(
            err => {
                console.log('Ошибка! ' + err.message);
                res.redirect(`/?msg=${err.response.data.message}`);
            }
        )
}