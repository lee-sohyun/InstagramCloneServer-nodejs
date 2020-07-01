'use strict';

exports.getPostByPostId = async function getPost(req, res) {
  const { owner } = req;
  res.send({ result: { owner } });
};
