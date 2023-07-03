const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 2
    },
    avatar: {
        type: String,
        minlenght: 2
    },
    email: {
        type: String,
        required: true,
        minlenght: 4
    }
})

const User = mongoose.model('user', userSchema);

module.exports = User;