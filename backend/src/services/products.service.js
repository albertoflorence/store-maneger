const { products } = require('../models');
const { OK, CREATED, NOT_FOUND } = require('../utils/codes');

const handleProductNotFound = () => ({ code: NOT_FOUND, data: { message: 'Product not found' } });

const getAll = async () => {
  const data = await products.getAll();
  return { code: OK, data };
};

const getById = async (id) => {
  const data = await products.getById(id);
  if (!data) {
    return handleProductNotFound();
  }
  return { code: OK, data };
};

const create = async (name) => {
  const id = await products.create(name);
  return { code: CREATED, data: { id, name } };
};

const update = async (id, name) => {
  const data = await products.getById(id);
  if (!data) {
    return handleProductNotFound();
  }
  await products.update(id, name);
  return { code: OK, data: { id: Number(id), name } };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
