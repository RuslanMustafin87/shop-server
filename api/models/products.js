const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: Buffer
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Object
    }
});

mongoose.model('products', productsSchema);
