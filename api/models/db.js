
const mongoose = require('mongoose');

const config = require('../../configs/config.json');

// const dbUrl = 'mongodb+srv://Ruslan:170997koT@cluster0.dj8aq.mongodb.net/YourFurniture?retryWrites=true&w=majority';
const dbUrl = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(
        () => {
            console.log('База данных запущена')
        },
        err => {
            console.log(err);
        }
    )

mongoose
    .connection
    .on('connected', () => {
        console.log(`База данных запущена на порте ${config.db.port}`)
    });

mongoose
    .connection
    .on('error', (err) => {
        console.log(`База данных не запущена. Ошибка ${err}`)
    });

mongoose
    .connection
    .on('disconnected', () => {
        console.log(`Соединение с базой данных разорвано`)
    });

process.on('SIGINT', () => {
    mongoose
        .connection
        .close(() => {
            console.log('Приложение закрыто');
            process.exit(0);
        })
});

require('./products');
require('./orders');
require('./users');
require('./furnitures');