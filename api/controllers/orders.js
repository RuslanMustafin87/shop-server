const mongoose = require('mongoose');

class OrderError extends Error {
    constructor(code, status, ...params) {
        super(...params)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, OrderError);
        }

        this.code = code;
        this.status = status;
    }
}

module.exports.getOrders = function (req, res) {
    const Order = mongoose.model('orders');

    Order
        .find()
        .sort({
            createdAt: 1,
        })
        .populate({
            path: 'productList',
            populate: {
                path: 'category'
            }
        })
        .then(
            orders => {
                if (!orders.length) throw new OrderError('generic', 404, 'Данные не найдены');
                res.status(200).json(orders);
            }, )
        .catch(
            err => {
                if (err instanceof OrderError) {
                    return res.status(err.status).json({
                        message: err.message
                    });
                }
                res.status(500).json({
                    message: 'Ошибка на сервере'
                });
            }
        )

}

module.exports.addOrder = function (req, res) {
    const Order = mongoose.model('orders');

    let order = new Order({
        customer: req.body.name,
        phone: req.body.phone,
        // total: req.body.total,
        productList: req.body.productList
    });

    order.total = req.body.total.toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            useGrouping: true,
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        })

    order.save()
        .then(
            product => res.status(201).json({
                message: 'Заказ добавлен'
            })
        )
        .catch(
            err => {
                res.status(500).json({
                    message: 'Ошибка при добавлении заказа'
                });
            })
}