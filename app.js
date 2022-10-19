const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
// const paginate = require('express-paginate');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const config = require('./configs/config.json');
const PORT = config.http.PORT;

require('./api/models/db');

var router = require('./router/router');
var apiRouter = require('./api/router/router');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a', interval: '8h' })

// TODO подключить dotoenv чтоб шифровать данные
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] ', {stream: accessLogStream} ));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({
    extended: false,
    limit: '50mb'
}));
app.use(cookieParser('qwe'));
app.use(session({
    secret: '170997koT',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {
        signed: true,
        path: '/',
        httpOnly: true,
        maxAge: 86400000
    }
}));
// app.use(paginate.middleware(10, 50));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

require('./configs/config-passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);
app.use('/api', apiRouter);

app.listen(PORT, function () {
    console.log(`Запущено на порте ${PORT}`);

})

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });