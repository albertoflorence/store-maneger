const httpStatus = require('./codeToHttpStatus');

module.exports = (res, { code, data }) => {
  res.status(httpStatus[code]).json(data);
};
