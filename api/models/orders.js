const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    customer: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    totalSumOfOrder: {
        type: Number,
        required: true,
    },
    productList: {
        type: Array,
        required: true
    },
});

mongoose.model('orders', ordersSchema);