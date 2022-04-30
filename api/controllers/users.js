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
        name: req.body.name,
        email: req.body.email
    });

    user.setPassword(req.body.password);

    User
        .findOne({
            email: req.body.email
        })
        .then(
            result => {
                if (result) throw new UserError('generic', 401, 'Пользователь с таким email уже существует');
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

module.exports.authUser = function (req, res) {
    const User = mongoose.model('users');
    User
        .findOne({
            email: req.body.email
        })
        .then(
            user => {
                if (!user) throw new UserError('generic', 404, 'Пользователя не существует');
                if (!user.validPassword(req.body.password)) throw new UserError('generic', 401, 'Неверный пароль');
                res.status(200).json({
                    name: user.name,
                    role: user.role
                });
            },
            err => {
                throw new UserError('generic', 404, 'Пользователя не существует');
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