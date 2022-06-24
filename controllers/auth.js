const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('users')

const generateAccessToken = (id, email) => {
    const payload = {
        userId: id,
        email: email
    }
    return jwt.sign(payload, 'Hello', {expiresIn: "1h"})
}