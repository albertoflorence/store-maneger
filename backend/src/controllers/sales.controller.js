const { sales } = require('../services');
const status = require('../utils/codeToHttpStatus');

const getAll = async (req, res) => {
  const { code, data } = await sales.getAll();
  res.status(status[code]).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { code, data } = await sales.getById(id);
  res.status(status[code]).json(data);
};

const create = async (req, res) => {
  const { data, code } = await sales.create(req.body);
  res.status(status[code]).json(data);
};

module.exports = {
  getAll,
  getById,
  create,
};
