const express = require('express');
const customer = require('./v1/customer');
const example = require('./v1/example');

const v1 = express.Router();

v1.use(customer);
v1.use(example);

module.exports = v1;