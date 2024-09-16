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
        saveUninitialized: false,
    })
)
server.use("/", route);

server.use('/', require('./routes/modify'))
server.use('/', require('./routes/routes'))

const DB_STRING = 'mongodb+srv://Beki:78122775Beki@cluster0.6ypmi.mongodb.net/app'
const PORT = '3000'
connectDatabase(DB_STRING')
    .then(() => {
        server.listen(PORT, console.log(`server started ${PORT}`));
    })
    .catch(() => {
        console.log(`Faild to connnect the database!`);
    });


