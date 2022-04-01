const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    }
});

userSchema.methods.setPassword = function(password){
    const salt = bcrypt.genSaltSync(10);
    this.hash = bcrypt.hashSync(password, salt);
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.hash);
}

mongoose.model('users', userSchema);