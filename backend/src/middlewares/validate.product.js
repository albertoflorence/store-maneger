const joi = require('joi');

const name = joi.string().min(5).required();
const id = joi.number().integer().positive();

const handleValidate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const status = error.details[0].type === 'any.required' ? 400 : 422;
    return res.status(status).json({ message: error.message });
  }

  next();
};

const create = handleValidate(joi.object({ name }));
const update = handleValidate(joi.object({ name, id }));

module.exports = {
  create,
  update,
};
