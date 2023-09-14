const { products } = require('../services');

const getAll = async (req, res) => {
  const result = await products.getAll();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await products.getById(id);
  if (!result) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(result);
};

const create = async (req, res) => {
  const { name } = req.body;
  const result = await products.create(name);
  res.status(201).json(result);
};

module.exports = {
  getAll,
  getById,
  create,
};
