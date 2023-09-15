const handleValidate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const status = error.details[0].type === 'any.required' ? 400 : 422;
    return res.status(status).json({ message: error.message });
  }

  next();
};

module.exports = handleValidate;
