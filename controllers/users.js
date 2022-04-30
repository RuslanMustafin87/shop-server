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
        return res.status(400).redirect(`/?msgSignError=${errStr}`);
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
                res.status( response.status ).redirect(`/?msgSignSuccessfully=${response.data.message}`)
            }
        )
        .catch(
            err => {
                console.log('Ошибка!' + err.message);
                res.status(err.response.status).redirect(`/?msgSignError=${err.response.data.message}`);
            }
        )
}

// module.exports.authUser = async function (req, res) {
//     let data = {
//         products: null,
//         userName: null
//     }

//     try {
//         let response = await axios({
//             url: `${URL}:${PORT}/api/users/authuser`,
//             method: "post",
//             data: {
//                 email: req.body.email,
//                 password: req.body.password
//             }
//         })
//         data.userName = response.data.name
//     } catch (err) {
//         return res.status( err.response.status ).redirect(`/?msgLoginError=${err.response.data.message}`)
//     }

//     try {
//         let response = await axios({
//             url: `${URL}:${PORT}/api/products`,
//             method: "get",
//         })
//         data.products = response.data
//     } catch (err) {
//         return res.render('error.pug', {
//             message: `${err.response.data.message}`
//         });
//     }

//     res.render('index.pug', data);
// };