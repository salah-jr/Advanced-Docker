const express = require('express');
const mongoose = require('mongoose');

// Initialize the express app
const app = express();
const port = 4000;

// Database Connection
const DB_USER = 'root';
const DB_PASSWORD = 'root';
const DB_HOST = 'mongo_db';
const DB_PORT = 27017;
const DB_NAME = 'mongodb';

const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
