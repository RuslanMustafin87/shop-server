const config = require('../configs/config.json');
const httpPORT = config.http.PORT;
const httpURL = config.http.URL;
const axios = require('axios');
const passport = require('passport');

const {
    check,
    validationResult
} = require('express-validator');

class MethodsOfUser {
    async addUser(req, res, next) {

        const validErrors = validationResult(req);

        if (!validErrors.isEmpty()) {
            let errStr = validErrors.array({
                onlyFirstError: true
            }).map((err) => err.msg).join(' ');
            return res.status(400).redirect(`/?msgSignError=${errStr}`);
            // return res.json({token: 'hello'})
        }

        axios({
                url: `${httpURL}:${httpPORT}/api/users/adduser`,
                method: "post",
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }
            })
            .then(
                response => {
                    res.status(response.status).redirect(`/?msgSignSuccessfully=${response.data.message}`)
                }
            )
            .catch(
                err => {
                    console.log('Ошибка!' + err.message);
                    res.status(err.response.status).redirect(`/?msgSignError=${err.response.data.message}`);
                }
            )
    }

    // async authUser(req, res, next) {
    //     try {

    //         let response = await axios({
    //             url: `${httpURL}:${httpPORT}/api/users/authuser`,
    //             method: "post",
    //             data: {
    //                 email: req.body.email,
    //                 password: req.body.password
    //             }
    //         });

    //         req.session.userName = response.data.name;
    //         res.locals.userName = response.data.name;
    //         next();
    //     } catch (err) {
    //         let url = new URL(req.headers.referer);
    //         url.searchParams.set('msgLoginError', err.response.data.message);

    //         return res.status(err.response.status).redirect(url);
    //     }
    // }

    authUser(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err);

            // if (!user) {return res.json({
            //     status: 'Invalid user or password'
            // })}

            if (!user) {
                let url = new URL(req.headers.referer);
                url.searchParams.set('msgLoginError', info);
                return res.status(404).redirect(url);
            }

            req.logIn(user, function (err) {
                if (err) return next(err);

                req.session.userName = user.name;
                res.locals.userName = user.name;
                return next()
            })
        })(req, res, next);
    }

    logoutUser(req, res, next) {
        req.session.destroy(() => {
            let url = new URL(req.headers.referer);
            // if (url.pathname === '/authuser') {
            //     url.pathname = '/';
            // } else {
            //     url.pathname = url.pathname.split('/')[1];
            // }
            res.status(200).redirect(url)
        });
    }

    checkIsUser(req, res, next) {
        if (req.session.userName) {
            res.locals.userName = req.session.userName;
        }
        next()
    }

    validUser(req, res, next) {
        return [
            check('email')
            .normalizeEmail()
            .isEmail()
            .withMessage('Не email адрес.'),
            check('password')
            .trim()
            .isLength({
                min: 6
            })
            .withMessage('Пароль должен содержать минимум 6 символов.')
            .matches(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/)
            .withMessage('Пароль должен содержать цифры и буквы в верхнем и нижнем регистре.')
        ]
    }
}

module.exports = new MethodsOfUser();