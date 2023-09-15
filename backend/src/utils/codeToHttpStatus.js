const { NOT_FOUND, OK, CREATED } = require('./codes');

const codes = {
  [NOT_FOUND]: 404,
  [OK]: 200,
  [CREATED]: 201,
};

module.exports = codes;
