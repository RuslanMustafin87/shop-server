const mongoose = require('mongoose');
const AES = require('crypto-js/aes');
const encUtf8 = require('crypto-js/enc-utf8');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = AES.encrypt(password, this.salt).toString();
}

userSchema.methods.validPassword = function(password){
    let bytes = AES.decrypt(this.hash, this.salt).toString(encUtf8);
    return bytes.toString(encUtf8) === password
}

mongoose.model('users', userSchema);