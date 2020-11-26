const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    skills: {
        type: String,
        default: 'Html'
    }

});

mongoose.model('skills', skillSchema);