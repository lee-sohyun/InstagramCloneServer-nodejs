'use strict';

module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "strict": 0,
    "no-restricted-globals": 0,
    "no-param-reassign": 0,
    "no-else-return": ["error", { allowElseIf: true }],
    "prefer-promise-reject-errors": 0,
    "consistent-return": 0,
    "no-unused-vars": 1,
    "no-restricted-syntax": 0,
    "no-continue": 0,
    "no-await-in-loop": 0,
    "camelcase": 0,
    "import/newline-after-import": { count: 0 },
    "import/no-dynamic-require": 0,
    "no-console": 0,
  },
};
