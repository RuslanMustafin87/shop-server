const mongoose = require('mongoose');
const config = require('../../configs/config.json');

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
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
require('./clients');
require('./orders');