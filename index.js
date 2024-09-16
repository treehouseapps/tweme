const express = require('express')
const server = express()
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const session = require('express-session')

const route = require('./routes/routes')
const connectDatabase = require('./config/dbconfig')
server.set('view engine', 'ejs')
server.use(express.static(path.join(__dirname, '/public')))
server.use(express.urlencoded({ extended: true }))
server.use(
    session({
        secret: "secretKey",
        cookie: { maxAge: 200000 },
        resave: false,
    })
)
server.use("/", route);

server.use('/', require('./routes/modify'))
server.use('/', require('./routes/routes'))

const DB_STRING = 'mongodb://localhost:27017/app'
const PORT = '3000'
connectDatabase('mongodb://localhost:27017/app')
    .then(() => {
        server.listen(PORT, console.log(`server started ${PORT}`));
    })
    .catch(() => {
        console.log(`Faild to connnect the database!`);
    });


