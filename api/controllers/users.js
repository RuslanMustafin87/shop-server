const mongoose = require('mongoose');
const formidable = require('formidable');

class UserError extends Error {
    constructor(code, status, ...params) {
        super(...params)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UserError);
        }

        this.code = code;
        this.status = status;
    }
}

module.exports.addUser = function (req, res) {
    const User = mongoose.model('users');

    let user = new User({
        login: req.body.login,
    });

    user.setPassword(req.body.password);

    User
        .findOne({
            login: req.body.login
        })
        .then(
            result => {
                if (result) throw new UserError('generic', 500, 'Такой пользователь уже существует');
                return user.save()
            }
        )
        .then(
            user => {
                res.status(201).json({
                    message: 'Пользователь добавлен'
                });
            }
        )
        .catch(
            err => {
                if (err instanceof UserError) {
                    return res.status(err.status).json({
                        message: err.message
                    });
                }
                res.status(500).json({
                    message: 'Ошибка на сервере'
                });
            }
        )
}

module.exports.validUser = function (req, res) {
    const User = mongoose.model('users');
    
    User
        .findOne({
            login: req.body.login
        })
        .then(
            user => {
                if (!user) throw new UserError('generic', 404, 'Пользователя не существует');
                if (!user.validPassword(req.body.password)) throw new UserError('generic', 401, 'Неверный пароль');

                res.status(200).end();
            }
        )
        .catch(
            err => {
                if (err instanceof UserError) {
                    return res.status(err.status).json({
                        message: err.message
                    });
                }
                res.status(500).json({
                    message: 'Ошибка на сервере'
                });
            }
        )

}