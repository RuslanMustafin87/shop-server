const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    customer: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    total: {
        type: String,
        required: true,
    },
    productList: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'products'
    }],
}, {
    timestamps: true
});

mongoose.model('orders', ordersSchema);