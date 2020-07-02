'use strict';

const PostService = require('../service/post');


exports.getPostList = async function getPostList(req, res) {
  const result = await PostService.getPostList();
  return res.send({ result });
};

exports.getPostByFeedId = async function getPostByFeedId(req, res) {
  const { feedId } = req.params;
  const result = await PostService.getPostByFeedId(feedId);
  res.send({ result });
};
