require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const services = require('./services');
var { mongoose } = require('./db/mongoose');

const PORT = process.env.PORT;
var app = express();

app.use(bodyParser.json());

services.install(app);

app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`);
});

module.exports = { app };