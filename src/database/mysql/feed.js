'use strict';

const { feed } = require('../mysql-model');
const handler = require('./handler')(feed);

module.exports = handler;
