const express = require('express');
const pg = require('pg');
const redis = require("redis");

// Initialize the express app
const app = express();
const port = 4000;

// Redis connection
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';

const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});

redisClient.on('error', err => console.log('Redis Client Error', err))
redisClient.on('connect', () => console.log('Connected To Redis...'))
redisClient.connect();

// Database Connection
const DB_USER = 'root';
const DB_PASSWORD = 'root';
const DB_HOST = 'postgres';
const DB_PORT = 5432;

const uri = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

const client = new pg.Client({
    connectionString: uri,
})

client.connect(undefined)
    .then(() => {
        console.log('Connected To MongoDB...');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

app.get('/', (req, res) => {
    redisClient.set('products', 'Products...')
    res.send('Hello World!');
});

app.get('/data', async (req, res) => {
    const products = await redisClient.get('products');
    res.send(`Hello World! <h2>${products}</h2>`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
