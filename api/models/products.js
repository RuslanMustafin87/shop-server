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
    priceIntl: {
        type: String,
        required: true
    },
    images: {
        type: [Buffer],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'furnitures'
    },
    rating: {
        type: Object
    }
});

mongoose.model('products', productsSchema);