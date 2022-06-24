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
    images: {
        type: [Buffer],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'furnitures'
    },
    rating: {
        type: Object,
        default: {
            realRating: 0,
            countOfVoters: 0
        },
    }
}, {
    toJSON: {
        virtuals: true
    }
});

productsSchema.virtual('priceIntl')
    .get(function () {
        priceIntl = (this.price).toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            useGrouping: true,
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        });
        return priceIntl;
    })

productsSchema.virtual('roundedRating')
    .get(function () {
        return Math.round(this.rating.realRating);
    })

mongoose.model('products', productsSchema);