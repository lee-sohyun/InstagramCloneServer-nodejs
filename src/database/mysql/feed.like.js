'use strict';

const { feedLike } = require('../mysql-model');
const handler = require('./handler')(feedLike);

module.exports = handler;
