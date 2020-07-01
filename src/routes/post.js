'use strict';

const router = require('express').Router();

const { auth } = require('../auth');
const post = require('../api/post');

router.use(auth);
router.get('/', post.getPostByPostId);

module.exports = router;
