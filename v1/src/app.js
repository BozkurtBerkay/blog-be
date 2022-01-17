const express = require('express');
const httpStatus = require('http-status');

const config = require('./config');
const loaders = require('./loaders');
const errorHandler = require('./middlewares/errorHandler');

config();
loaders();

const app = express();

app.use((req, res, next) => {
    const err = new Error('Bad Request');
    err.status = httpStatus.BAD_REQUEST;
    next(err);
})
app.use(errorHandler)

app.listen(process.env.APP_PORT, () => {
    console.log(`Sunucu ${process.env.APP_PORT} portunda ayakta...`);
})