'use strict';

const { post } = require('../mysql-model');
const handler = require('./handler')(post);

module.exports = handler;
