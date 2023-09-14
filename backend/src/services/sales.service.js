const { sales } = require('../models');
const camelize = require('../utils/camelize');

const getAll = async () => {
    const result = await sales.getAll();
    return result.map(camelize);
};
const getById = async (id) => {
  const result = await sales.getById(id);
  return result.map(camelize);
};

module.exports = {
  getAll,
  getById,
};
