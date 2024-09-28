const express = require('express')
const server = express.Router()

const users_model = require('../models/coll-users')
const news_model = require('../models/coll-news')
const meme_model = require('../models/coll-meme')
const tweet_model = require('../models/coll-tweet')

const home = async (req, res) => {
    const result = await news_model.find()
    res.render('index', { title: 'Home', result, session: req.session.name })
}
const gener = async (req, res) => {
    res.render('gener', { title: 'Gener', session: req.session.name })
}
const post = async (req, res) => {
    
        const result = await meme_model.find().sort({ _id: -1 })
        res.render('post', { title: 'Post', result, session: "nobody" })
    
}
const tweet = async (req, res) => {
    if (req.session.name) {
        const result = await tweet_model.find().sort({ _id: -1 })
        res.render('tweet', { title: 'Tweet', result, session: req.session.name })
    }
    else {
        res.redirect('/login')
    }
}
const login = async (req, res) => {
    await res.render('login', { title: 'Login', session: req.session.name })
}
const form = async (req, res) => {
    await res.render('form', { title: 'Form', session: req.session.name })
}

module.exports = { home, gener, post, tweet, login, form }
