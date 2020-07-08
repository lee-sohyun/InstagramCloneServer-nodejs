'use strict';

const { feedContents } = require('../mysql-model');
const handler = require('./handler')(feedContents);

module.exports = handler;
