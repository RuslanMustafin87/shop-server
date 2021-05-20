const mongoose = require('mongoose');

const clientsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    sum: {
        type: Number,
        required: true,
    },
    productList: {
        type: Array,
        required: true
    },
});

mongoose.model('clients', clientsSchema);