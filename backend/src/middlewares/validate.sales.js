const joi = require('joi');
const handleValidate = require('../utils/handleValidate');

const productId = joi
  .number()
  .required()
  .messages({ 'any.required': '"productId" is required' });

const quantity = joi.number().min(1).required().messages({
  'any.required': '"quantity" is required',
  'number.min': '"quantity" must be greater than or equal to 1',
});

const create = handleValidate(
  joi.array().min(1).items(joi.object({ productId, quantity })),
);

const update = handleValidate(joi.object({ quantity }));

module.exports = {
  create,
  update,
};
