const axios = require('axios');
const PORT = 3007;

module.exports.getProduct = function (req, res) {

    axios({
        url: `http://localhost:${PORT}/api/products/getproduct?id=${req.query.id}`,
        method: 'GET',
    }).then(
        response => {
            response.data.rating = Math.round(response.data.rating.generalRating);
            console.log(response.data);
            res.render('product.pug', response.data);

        },
        err => {
            console.log('Ошибка 1 ' + err.message);
            res.render('product.pug', Object.assign(response.data, {}));
            // res.json(
            //     err.response.data
            // )
        }
    ).catch(
        err => {
            console.log('Ошибка 2 ' + err.message);
        }
    )

};

module.exports.updateProduct = function (req, res) {

    let data = req.body;

    axios({
        url: `http://localhost:${PORT}/api/products/updateproduct`,
        method: 'post',
        data: data
    }).then(
        response => {

            console.log(response.data);

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
}

module.exports.updateRatingProduct = function (req, res) {

    axios({
        url: `http://localhost:${PORT}/api/products/getproduct?id=${req.body.id}`,
    }).then(
        response => {
            return response.data;
        },
        err => {
            console.log('Ошибка 1 ' + err.message);
            res.json(
                err.response.data
            )
        }
    ).then(
        data => {
            let body = {};

            if (!data.rating) {
                console.log('ji');

                body = Object.assign(req.body, {
                    rating: {
                        generalRating: req.body.rating,
                        countOfVoters: 1
                    }
                });

            } else {
                console.log('ji2');

                let generalRating = +((data.rating.generalRating * data.rating.countOfVoters + req.body.rating) / ( data.rating.countOfVoters + 1)).toFixed(2);

                body = Object.assign(req.body, {
                    rating: {
                        generalRating: generalRating,
                        countOfVoters: ++data.rating.countOfVoters
                    }
                });
            }

            return axios({
                url: `http://localhost:${PORT}/api/products/updateproduct`,
                method: 'post',
                data: body
            })
        },
    ).then(
        res => {
            console.log(res.data.message);
        }
    ).catch(
        err => {
            console.log('Ошибка 2 ' + err.message);
        }
    )
}