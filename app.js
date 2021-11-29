const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
//const cookieParser = require('cookie-parser');
const bunyan = require('bunyan');
const flash = require('connect-flash');
const session = require('express-session');
//const redis = require('redis');
//const redisStorage = require('connect-redis')(session);
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const config = require('./configs/config.json');
const PORT = config.http.PORT;
// const PORT = config.testHttp.PORT;

require('./api/models/db');

var log = bunyan.createLogger({
    name: 'myserver',
    serializers: {
        req: bunyan.stdSerializers.req,
        res: bunyan.stdSerializers.res
    }
});

var router = require('./router/router');
var apiRouter = require('./api/router/router');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({
    extended: false,
    limit: '50mb'
}));
app.use(session({
    secret: '170997',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {
        signed: true
    }
}));
app.use(flash());
//app.use(cookieParser('qwe'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/home', function(req, res, next){
    if (!req.session.isAdmin === true) {
        res.redirect('/');
    } else {
        next();
    }
})

app.use('/', router);
app.use('/api', apiRouter);



app.listen(config.PORT, function () {

    log.info('server listening');
    console.log(`Запущено на порте ${PORT}`);

})
