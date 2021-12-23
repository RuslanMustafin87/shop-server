const mongoose = require('mongoose');

module.exports.addOrder = function (req, res) {
    const Order = mongoose.model('orders');
    console.log('hih');
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
                res.status(404).json({
                    message: 'Ошибка при добавлении заказа'
                });
            })
}