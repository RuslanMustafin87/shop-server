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
    // TODO сделать вывод времени в предсатвлении
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});

ordersSchema.virtual('datecreate')
    .get(function (){
        return (new Date(this.createdAt).toLocaleString('ru-RU', {
            timeZone: 'Asia/Yekaterinburg',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        }));
    });

mongoose.model('orders', ordersSchema);