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
    passwordHash: {
        type: String,
        required: true,
        set: password => {
            const salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password, salt);
        }
    },
    role: {
        type: String,
        default: 'user'
    }
});

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.passwordHash);
}

mongoose.model('users', userSchema);