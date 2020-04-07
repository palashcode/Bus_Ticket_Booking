const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config/config');
const morgan = require('../config/morgan');
const routes = require('../routes/index');


const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);

module.exports = app;
