const { sales, salesProducts, products } = require('../models');
const camelize = require('../utils/camelize');
const { OK, NOT_FOUND, CREATED, NO_CONTENT } = require('../utils/codes');

const handleSalesNotFound = () => ({ code: NOT_FOUND, data: { message: 'Sale not found' } });

const getAll = async () => {
    const result = await salesProducts.getAll();
    return { data: result.map(camelize), code: OK };
};

const getById = async (id) => {
  const result = await salesProducts.getById(id);
  if (!result.length) {
    return handleSalesNotFound();
  }
  return { data: result.map(camelize), code: OK };
};

const create = async (data) => {
  const promises = data.map(({ productId }) => products.getById(productId));
  const results = await Promise.all(promises);
  if (!results.length || !data || results.some((result) => !result)) {
    return { data: { message: 'Product not found' }, code: NOT_FOUND };
  }
  const saleId = await sales.create();
  const salesData = data.map(({ productId, quantity }) => ([saleId, productId, quantity]));
  await salesProducts.create(salesData);
  return { data: { id: saleId, itemsSold: data }, code: CREATED };
};

const deleteOne = async (id) => {
  const result = await salesProducts.getById(id);
  if (!result.length) {
    return handleSalesNotFound();
  }
  await sales.deleteOne(id);
  return { code: NO_CONTENT };
};

module.exports = {
  getAll,
  getById,
  create,
  deleteOne,
};
