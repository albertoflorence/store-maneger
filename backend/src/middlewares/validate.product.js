const joi = require('joi');

const schema = joi.object({
  name: joi.string().min(5).required(),
});

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
