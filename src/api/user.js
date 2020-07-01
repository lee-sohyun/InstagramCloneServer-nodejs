'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');

exports.login = async function login(req, res) {
  const { id, password } = req.body;

  if (!id || !password) return res.status(400).send({ error: 'error' });
  const user = {
    id: 'test',
    email: 'test@dev.com',
    password: '$2b$10$kpyIWSFin6yohGCaQFHEKOqJwwnSZ6bQzg5eKF.E9xncA5f/8PB6a',
  };

  // TODO. DB에서 email로 유저 찾기 / 없으면 not found 에러

  if (id === user.id) {
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) return res.status(400).send({ error: 'Invalid password' });
  } else {
    return res.status(400).send({ error: 'NotFoundUser' });
  }

  // TODO. 매번 새로운 값으로 갱신시켜 DB 또는 Redis에 저장
  // const access_token = jwt.sign({ id: user.id }, config.jwt.secretKey, { expiresIn: 86400 });
  const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QiLCJpYXQiOjE1OTM1MDYyODcsImV4cCI6MTU5MzU5MjY4N30.5z9f7UKvJEsHR1dY2bvQv8p9Nydf_zefPWgpSqsDGWM';
  user.password = undefined;
  res.send({ access_token });
};
