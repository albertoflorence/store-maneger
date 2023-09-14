const { sales } = require('../services');

const getAll = async (req, res) => {
  const result = await sales.getAll();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await sales.getById(id);
  if (!result.length) return res.status(404).json({ message: 'Sale not found' });
  res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
};
