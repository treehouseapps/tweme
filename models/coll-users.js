const express = require('express')
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})
const collection = new mongoose.model('users', schema)
module.exports = collection