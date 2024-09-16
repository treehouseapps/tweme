const express = require('express')
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    pic: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }

})
const collection = new mongoose.model('news', schema)
module.exports = collection