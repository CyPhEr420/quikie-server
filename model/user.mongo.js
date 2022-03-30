const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    friends: [String],
    friendsRequests: [String],
    community: [String],

})

module.exports = mongoose.model('user', userSchema)