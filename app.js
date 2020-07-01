'use strict';

const path = require('path');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 7001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

fs.readdirSync(`${__dirname}/src/routes`).forEach((f) => {
  if (path.extname(f) === '.js') {
    const baseName = path.basename(f, '.js');
    app.use(`/api/${baseName}`, require(`${__dirname}/src/routes/${f}`)); // eslint-disable-line global-require
  }
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/`);
});
