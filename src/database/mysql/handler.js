'use strict';

const _ = require('lodash');
const { sequelize } = require('../mysql-model');

const buildOptions = ({
  where,
  attributes,
  transaction,
  order,
  offset,
  limit,
  include,
}) => {
  const options = { where };

  if (transaction) options.transaction = transaction;
  if (attributes && !_.isEmpty(attributes)) options.attributes = attributes;
  if (order && order.length) options.order = order;
  if (offset) options.offset = offset;
  if (limit && limit > 1) options.limit = limit;
  if (include && include.length) options.include = include;

  return options;
};

const queryFunc = async (params) => {
  const options = buildOptions(params);
  const { array, model, limit } = params;

  if (limit === 1) {
    const data = await model.findOne(options);
    if (data) {
      return array ? [data.dataValues] : data.dataValues;
    }
    return;
  }

  try {
    const data = await model.findAll(options);
    if (!data) return [];

    return data.map((l) => l.dataValues);
  } catch (err) {
    return Promise.reject(err);
  }
};

const updateFunc = async ({
  model,
  where,
  value,
  limit,
  transaction,
  check = true,
}) => {
  const options = { where };

  if (transaction) {
    transaction.canRollback = true;
    options.transaction = transaction;
  }
  if (limit) options.limit = limit;

  try {
    const count = await model.update(value, options);

    if (check && count.length && count[0] === 0) throw new Error();
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = (model) => ({
  query: async (params) => {
    params = { ...(params || {}), model, array: true };

    return queryFunc(params);
  },

  get: async (params) => {
    params = { ...(params || {}), model, limit: 1 };

    return queryFunc(params);
  },

  count: async (params) => {
    try {
      return model.count(params);
    } catch (err) {
      return Promise.reject(err);
    }
  },

  put: async (item, transaction) => {
    try {
      if (transaction) {
        transaction.canRollback = true;
        return await model.create(item, { transaction });
      }
      return await model.create(item);
    } catch (err) {
      return Promise.reject(err);
    }
  },

  puts: async (items, transaction) => {
    try {
      if (transaction) {
        transaction.canRollback = true;
        return await model.bulkCreate(items, { transaction });
      }
      return await model.bulkCreate(items);
    } catch (err) {
      return Promise.reject(err);
    }
  },

  update: async (params) => {
    params = { ...(params || {}), model };

    return updateFunc(params);
  },

  increase: async (params) => {
    const { value } = params;

    if (!value || typeof (value) !== 'object' || Array.isArray(value)) {
      return Promise.reject(err);
    }

    Object.entries(value).forEach(([k, v]) => {
      value[k] = sequelize.literal(`\`${k}\` + ${v}`);
    });

    params = { ...params, model };

    return updateFunc(params);
  },

  delete: async ({
    where,
    limit,
    transaction,
  }) => {
    try {
      if (transaction) {
        transaction.canRollback = true;
        return await model.destroy({ where, limit, transaction });
      }
      return await model.destroy({ where, limit });
    } catch (err) {
      return Promise.reject(err);
    }
  },

  truncate: async () => {
    try {
      return await model.truncate();
    } catch (err) {
      return Promise.reject(err);
    }
  },
});
