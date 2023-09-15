const { sales } = require('../services');
const handleResponse = require('../utils/handleResponse');

const getAll = async (req, res) => {
  const result = await sales.getAll();
  handleResponse(res, result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await sales.getById(id);
  handleResponse(res, result);
};

const create = async (req, res) => {
  const result = await sales.create(req.body);
  handleResponse(res, result);
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const result = await sales.deleteOne(id);
  handleResponse(res, result);
};

const update = async (req, res) => {
  const { productId, saleId } = req.params;
  const { quantity } = req.body;
  const result = await sales.update({ productId, saleId, quantity });
  handleResponse(res, result);
};

module.exports = {
  getAll,
  getById,
  create,
  deleteOne,
  update,
};
