const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    members: [String],
    posts: [String],
    events: [String],
    admin: String,
})

module.exports = mongoose.model('community', communitySchema);