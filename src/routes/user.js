'use strict';

const router = require('express').Router();
const user = require('../api/user');

router.post('/', user.login);

module.exports = router;
