const express = require('express')
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
    like: {
        type: String,
        required: true
    },
    dislike: {
        type: String,
        required: true
    }
})
const collection = new mongoose.model('memes', schema)

module.exports = collection