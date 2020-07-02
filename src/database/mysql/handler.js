'use strict';

const { sequelize } = require('../mysql-model');

const buildOptions = ({
  where,
  attributes,
  length,
  transaction,
  order,
  offset,
}) => {
  const options = { where };

  if (transaction) {
    options.transaction = transaction;
  }

  if (length && length > 1) {
    options.limit = length;
  }

  if (attributes && attributes.length) {
    options.attributes = attributes;
  }

  if (order && order.length) {
    options.order = order;
  }

  if (offset && order.offset) {
    options.offset = offset;
  }

  return options;
};

const queryFunc = async (params) => {
  const options = buildOptions(params);
  const { model, length } = params;

  if (length === 1) {
    const data = await model.findOne(options);
    return data ? data.dataValues : undefined;
  }

  const data = await model.findAll(options);
  if (!data) return [];

  return data.map(l => l.dataValues);
};

const updateFunc = async ({
  model, where, value, transaction,
}) => {
  const options = { where };
  if (transaction) options.transaction = transaction;

  const count = await model.update(value, { where, transaction });

  if (count.length && count[0] === 0) throw new Error();
};

const updateFuncWithoutcheck = async ({
  model, where, value, transaction,
}) => {
  const options = { where };
  if (transaction) options.transaction = transaction;

  const count = await model.update(value, { where, transaction });

};

module.exports = (model) => ({
  query: async (params) => {
    if (!params) params = {};
    const {
      where, attributes, length, transaction, order, offset,
    } = params;

    return queryFunc({
      model,
      where,
      attributes,
      length,
      transaction,
      order,
      offset,
    });
  },

  get: async ({ where, attributes, transaction }) => queryFunc({
    model,
    where,
    attributes,
    length: 1,
    transaction,
  }),

  count: async (where, transaction) => {
    if (transaction) return model.count(where, transaction);
    return model.count(where);
  },

  put: async (item, transaction) => {
    if (transaction) return model.create(item, { transaction });
    return model.create(item);
  },

  puts: async (items, transaction) => {
    if (transaction) return model.bulkCreate(items, { transaction });
    return model.bulkCreate(items);
  },

  update: async ({ where, value, transaction }) => updateFunc({
    model, where, value, transaction,
  }),

  updateWithoutCheck: async ({ where, value, transaction }) => updateFuncWithoutcheck({
    model, where, value, transaction,
  }),

  increase: async ({ where, params, transaction }) => {
    const value = {};

    Object.keys(params).forEach((k) => {
      value[k] = sequelize.literal(`\`${k}\` + ${params[k]}`);
    });

    return updateFunc({
      model, where, value, transaction,
    });
  },

  delete: async (where, transaction) => {
    if (transaction) return model.destroy({ where, transaction });
    return model.destroy({ where });
  },

  truncate: async () => model.truncate(),
});
