const joi = require('joi');

const schema = joi
  .array()
  .min(1)
  .items(
    joi.object({
      productId: joi
        .number()
        .required()
        .messages({ 'any.required': '"productId" is required' }),
      quantity: joi
        .number()
        .min(1)
        .required()
        .messages({
          'any.required': '"quantity" is required',
          'number.min': '"quantity" must be greater than or equal to 1',
        }),
    }),
  );

const create = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const status = error.details[0].type === 'any.required' ? 400 : 422;
    return res.status(status).json({ message: error.message });
  }

  next();
};

module.exports = {
  create,
};
