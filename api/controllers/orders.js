const mongoose = require('mongoose');

module.exports.addOrder = function (req, res) {
    const Order = mongoose.model('orders');

    let order = new Order({
        customer: req.body.name,
        phone: req.body.phone,
        total: req.body.total,
        productList: req.body.productList
    });

    order.save()
        .then(
            product => res.status(201).json({ message: 'Заказ добавлен' })
        )
        .catch(
            err => {
                res.status(500).json({
                    message: 'Ошибка при добавлении заказа'
                });
            })
}