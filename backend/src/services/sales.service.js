const { sales, salesProducts, products } = require('../models');
const camelize = require('../utils/camelize');
const { OK, NOT_FOUND, CREATED, NO_CONTENT } = require('../utils/codes');

const handleSalesNotFound = () => ({
  code: NOT_FOUND,
  data: { message: 'Sale not found' },
});

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
  const salesData = data.map(({ productId, quantity }) => [saleId, productId, quantity]);
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

const update = async ({ productId, saleId, quantity }) => {
  const result = await salesProducts.getById(saleId);
  if (!result.length) return handleSalesNotFound();
  const sale = result.find((item) => item.product_id === Number(productId));
  if (!sale) return { data: { message: 'Product not found in sale' }, code: NOT_FOUND };
  await salesProducts.update([quantity, saleId, productId]);
  return {
    data: {
      date: sale.date,
      saleId: Number(saleId),
      productId: Number(productId),
      quantity,
    },
    code: OK,
  };
};

module.exports = {
  getAll,
  getById,
  create,
  deleteOne,
  update,
};
