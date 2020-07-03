'use strict';

const router = require('express').Router();

const { auth } = require('../auth');
const feed = require('../api/feed');

router.use(auth);
router.get('/', feed.getFeedList);
router.get('/:feedId', feed.getFeedByFeedId);

module.exports = router;
