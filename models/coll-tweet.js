const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    gener: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: [{ type: String, ref: 'User' }], // Stores user IDs who liked
    dislikes: [{ type: String, ref: 'User' }], // Stores user IDs who disliked
    normal: [{ type: String, ref: 'User' }] // Stores user IDs who reacted normal

})

const collection = new mongoose.model('tweets', schema)
module.exports = collection