const { products } = require('../models');

const getAll = async () => products.getAll();
const getById = async (id) => products.getById(id);
const create = async (name) => {
  const id = await products.create(name);
  return { id, name };
};

module.exports = {
  getAll,
  getById,
  create,
};
