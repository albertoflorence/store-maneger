const joi = require('joi');
const handleValidate = require('../utils/handleValidate');

const name = joi.string().min(5).required();
const id = joi.number().integer().positive();

const create = handleValidate(joi.object({ name }));
const update = handleValidate(joi.object({ name, id }));

module.exports = {
  create,
  update,
};
