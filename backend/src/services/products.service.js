const { products } = require('../models');

const getAll = async () => products.getAll();
const getById = async (id) => products.getById(id);

module.exports = {
  getAll,
  getById,
};
