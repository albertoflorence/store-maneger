const { products } = require('../services');
const handleResponse = require('../utils/handleResponse');

const getAll = async (_, res) => {
  const result = await products.getAll();
  handleResponse(res, result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await products.getById(id);
  handleResponse(res, result);
};

const create = async (req, res) => {
  const { name } = req.body;
  const result = await products.create(name);
  handleResponse(res, result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await products.update(id, name);
  handleResponse(res, result);
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const result = await products.deleteOne(id);
  handleResponse(res, result);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};
