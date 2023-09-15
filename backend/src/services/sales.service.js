const { sales, salesProducts } = require('../models');
const camelize = require('../utils/camelize');

const getAll = async () => {
    const result = await salesProducts.getAll();
    return result.map(camelize);
};

const getById = async (id) => {
  const result = await salesProducts.getById(id);
  return result.map(camelize);
};

const create = async (products) => {
  const saleId = await sales.create();
  const salesData = products.map(({ productId, quantity }) => ([saleId, productId, quantity]));
  await salesProducts.create(salesData);
  return { id: saleId, itemsSold: products };
};

module.exports = {
  getAll,
  getById,
  create,
};
