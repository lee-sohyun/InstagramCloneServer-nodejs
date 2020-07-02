'use strict';

exports.auth = async function authenticate(req, res, next) {
  const { authorization } = req.headers;

  // TODO. DB 또는 Redis를 통해 토큰 값 비교
  const verification = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QiLCJpYXQiOjE1OTM1MDYyODcsImV4cCI6MTU5MzU5MjY4N30.5z9f7UKvJEsHR1dY2bvQv8p9Nydf_zefPWgpSqsDGWM';

  if (!authorization) return res.status(400).send({ error: 'Invalid AccessToken' });
  if (authorization !== verification) return res.status(400).send({ error: 'not equal verification' });
  req.owner = 'test';
  return next();
};
