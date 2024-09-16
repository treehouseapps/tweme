const express = require('express')
const server = express.Router()

const users = require('../models/coll-users')
const news = require('../models/coll-news')
const meme = require('../models/coll-meme')
const tweet = require('../models/coll-tweet')

server.post('/signup', (req, res) => {
    users.insertMany(req.body)
    res.redirect('/login')
})

server.get('/like/:id', async (req, res) => {
    const result = await meme.findOne({ _id: req.params.id })
    let oldval = result.like
    oldval++
    let newval = oldval
    await meme.updateOne({ _id: req.params.id }, { like: newval })
    res.redirect('/post')
})

server.get('/dislike/:id', async (req, res) => {
    const result = await meme.findOne({ _id: req.params.id })
    let oldval = result.dislike
    oldval++
    let newval = oldval
    await meme.updateOne({ _id: req.params.id }, { dislike: newval })
    res.redirect('/post')
})
server.get('/likee/:id', async (req, res) => {
    const result = await tweet.findOne({ _id: req.params.id })
    let oldval = result.like
    oldval++
    let newval = oldval
    await tweet.updateOne({ _id: req.params.id }, { like: newval })
    res.redirect('/tweet')
})
server.get('/dislikee/:id', async (req, res) => {
    const result = await tweet.findOne({ _id: req.params.id })
    let oldval = result.dislike
    oldval++
    let newval = oldval
    await tweet.updateOne({ _id: req.params.id }, { dislike: newval })
    res.redirect('/tweet')
})
server.post('/posting', (req, res) => {
    meme.insertMany(req.body)
    res.redirect('/post')
})
server.post('/postinge', (req, res) => {
    tweet.insertMany(req.body)
    res.redirect('/tweet')
})
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
server.post('/login', async (req, res) => {
    let uname = req.body.name
    const result = await users.findOne({ name: uname })
    if (result) {
        req.session.name = uname
        if (uname == 'tweme') {
            res.redirect('/form')
        }
        else {
            res.redirect('/post')
        }
    }
    else {
        res.redirect('/login')
    }

})
server.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/login')
})

module.exports = server