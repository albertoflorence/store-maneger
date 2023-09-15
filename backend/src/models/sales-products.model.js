const connection = require('./connection');

const getAll = async () => {
  const query = `
    SELECT sale_id, product_id, quantity, date
    FROM sales_products as SP
    JOIN sales as S ON SP.sale_id = S.id
  `;
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = `
    SELECT product_id, quantity, date
    FROM sales_products as SP
    JOIN sales as S ON SP.sale_id = S.id
    WHERE sale_id = ?`;
  const [result] = await connection.execute(query, [id]);
  return result;
};

const create = async (sales) => {
  const query = `
    INSERT INTO
    sales_products (sale_id, product_id, quantity)
    VALUES ?
  `;
  await connection.query(query, [sales]);
};

const update = async (sale) => {
  const query = `
    UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?
  `;
  await connection.execute(query, sale);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
