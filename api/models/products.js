const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    background: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
});

mongoose.model('products', productsSchema);