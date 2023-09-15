const connection = require('./connection');

const create = async () => {
  const query = 'INSERT INTO sales () VALUES ()';
  const [{ insertId }] = await connection.execute(query);
  return insertId;
};

const deleteOne = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  await connection.execute(query, [id]);
};

module.exports = {
  create,
  deleteOne,
};
