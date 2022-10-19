const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const config = require('./config.json');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (username, password, done) {
        User.findOne({
            email: username
        }, function (err, user) {
            if (err) return done(err);
            if (!user) return done(null, false, 'Неверный логин');
            if (!user.validPassword(password)) return done(null, false, 'Неверный пароль');
            return done(null, user);
        });
    }
));