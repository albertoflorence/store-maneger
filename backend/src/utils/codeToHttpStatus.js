const { NOT_FOUND, OK, CREATED, NO_CONTENT } = require('./codes');

const codes = {
  [NOT_FOUND]: 404,
  [OK]: 200,
  [CREATED]: 201,
  [NO_CONTENT]: 204,
};

module.exports = codes;
