'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../../config');
const baseName = path.basename(__filename);
const { snakeCaseToCamelCase } = require('../../libs/util');

const db = {};
const sequelize = new Sequelize(config.mysql);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const sequelizeDefine = sequelize.define;
sequelize.define = function newSequelizeDefine(modelName, attributes, options, associateFunc) {
  const model = sequelizeDefine.call(this, modelName, attributes, options);

  if (associateFunc) model.associateFunc = associateFunc;

  return model;
};

fs.readdirSync(__dirname).forEach((file) => {
  if (path.extname(file) === '.js' && file !== baseName) {
    const filePath = path.join(__dirname, file);
    const r = require(filePath); // eslint-disable-line

    if (r) {
      const model = sequelize.import(filePath, r);
      db[snakeCaseToCamelCase(model.name)] = model;
    }
  }
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associateFunc) {
    db[modelName].associateFunc(db);
  }
});

module.exports = db;
