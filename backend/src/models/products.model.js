const connection = require('./connection');

const getAll = async () => {
 const [result] = await connection.execute('SELECT * FROM products');
 return result;
};

const getById = async (id) => {
  const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
 return result;
};

const create = async (name) => {
  const query = `
    INSERT INTO products (name) values (?)
  `;
  const [{ insertId }] = await connection.execute(query, [name]);
  return insertId;
};

const update = async (id, name) => {
  const query = `
    UPDATE products SET name = ? WHERE id = ?
  `;
  await connection.execute(query, [name, id]);
};

const deleteOne = async (id) => {
  const query = `
    DELETE FROM products WHERE id = ?
  `;
  await connection.execute(query, [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};
