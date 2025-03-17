const express = require('express');
const server = express();
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const connectMongo = require('connect-mongo'); // Import connect-mongo

const route = require('./routes/routes');
const connectDatabase = require('./config/dbconfig');

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));
server.use(express.static(path.join(__dirname, '/public')));
server.use(express.urlencoded({ extended: true }));

// Create a MongoStore instance using 'new'
const MongoStore = connectMongo.create({
    mongoUrl: process.env.DBCONNECTION,  // Connection string from environment variables
    collectionName: 'sessions', // Optional: specify the collection for sessions
});

// Session middleware with MongoDB store
server.use(
    session({
        secret: process.env.SESSION_SECRET || 'your-secret-key',
        cookie: { maxAge: 200000 }, // Set cookie expiration
        resave: false,
        saveUninitialized: false,
        store: MongoStore, // Use MongoStore for session storage
    })
);

// Routes
server.use('/', route);
server.use('/', require('./routes/modify'));
server.use('/', require('./routes/routes'));

// MongoDB connection
const DB_STRING = "mongodb+srv://Beki:78122775Beki@cluster0.6ypmi.mongodb.net/app"
const PORT = process.env.PORT || 3000;

connectDatabase(DB_STRING)
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch(() => {
        console.error('Failed to connect to the database!');
    });

module.exports = server;
