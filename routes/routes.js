const express = require("express")
const server = express.Router()

const { home, gener, post, tweet, login, form } = require('../controller/controller')
server.get('/', home)
server.get('/gener', gener)
server.get('/post', post)
server.get('/tweet', tweet)
server.get('/login', login)
server.get('/form', form)

module.exports = server