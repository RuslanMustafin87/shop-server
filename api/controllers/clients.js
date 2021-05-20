const mongoose = require('mongoose');

module.exports.setClients = function (req, res) {
    const Client = mongoose.model('clients');

    let client = new Client({
        name: req.body.name,
        phone: req.body.phone,
        sum: req.body.sum,
        productList: req.body.productList
    })

    client.save()
        .then(
            client => {
                res.status(201).json({
                    status: 'Заказ принят'
                });
            },
            err => {
                res.status(404).json({
                    status: 'Ошибка при добавлении заказа'
                });
            }
        )
}