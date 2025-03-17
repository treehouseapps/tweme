const express = require('express')
const server = express.Router()

const news = require('../models/coll-news')
const meme = require('../models/coll-meme')
const tweet = require('../models/coll-tweet')

server.get('/deleting/:id', async (req, res) => {
    await news.deleteOne({ _id: req.params.id })
    res.redirect('/')
})
server.get('/deletinge/:id', async (req, res) => {
    await meme.deleteOne({ _id: req.params.id })
    res.redirect('/post')
})
server.get('/deletingee/:id', async (req, res) => {
    await tweet.deleteOne({ _id: req.params.id })
    res.redirect('/tweet')
})

server.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/login')
})

module.exports = server