'use strict';

const FeedService = require('../service/feed');


exports.getFeedList = async function getFeedList(req, res) {
  const result = await FeedService.getFeedList();
  return res.send({ result });
};

exports.getFeedByFeedId = async function getFeedByFeedId(req, res) {
  const { feedId } = req.params;
  const result = await FeedService.getFeedByFeedId(feedId);
  res.send({ result });
};
