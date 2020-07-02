'use strict';

const config = {
  jwt: {
    secretKey: 'SeCrEtKeY',
  },
  mysql: {
    username: 'admin',
    password: 'admin1234',
    database: 'test',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    pool: {
      min: 0,
      max: 5,
      idle: 10000,
      acquire: 100000,
      evict: 100000,
    },
    operatorsAliases: false,
    define: {
      charset: 'utf8mb4',
      dialectOptions: {
        collate: 'utf8mb4_general_ci',
      },
    },
  }
};

module.exports = config;
