const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        validate: {
            validator: function(text){
                return typeof text == 'string';
            },
            message: 'Error'
        }
    },
    date: {
       type: Date,
       default: Date.now()
    },
    skill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "skills"
    }

});

mongoose.model('users', userSchema);