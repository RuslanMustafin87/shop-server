const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    const salt = bcrypt.genSaltSync(10);
    this.hash = bcrypt.hashSync(password, salt);
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.hash);
}

mongoose.model('users', userSchema);