//const rp = require('request-promise');
const mongoose = require('mongoose');
const crypto = require('crypto');

module.exports.getIndex = function (req, res) {
    //log.info({ req: req }, 'start request');

    res.render('index.pug', {
        header2: 'Hello'
    });
    //log.info({ res: res }, 'done response');
};

module.exports.authHome = function (req, res) {

    const User = mongoose.model('users');
    const password = crypto.createHash('md5').update(req.body.password).digest('hex');
    
    User.findOne({
            "user": req.body.user,
            "password": password
        })
        .then(
            item => {
                
                //req.session.isAdmin = true;
                if (!item) return res.json('Такого пользователя нет');;

                req.session.isAdmin = true;
                res.redirect('/home');
            }
        )


};

module.exports.signIn = function (req, res) {

    const User = mongoose.model('users');
    const Skill = mongoose.model('skills');

    let html = new Skill({
        _id: new mongoose.Types.ObjectId(),
        skills: "java"
    });

    html.save();

    const password = crypto.createHash('md5').update(req.body.password).digest('hex');

    let item = new User({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        password: password,
        skill: html._id
    });

    item.save()
        .then(
            () => {
                console.log('Запись добавлена');
                res.status(201).end();
            },
            err => {
                console.log('Запись не добавлена');
                res.status(404).end();
            }
        )
}