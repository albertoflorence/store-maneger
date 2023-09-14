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

module.exports = {
  getAll,
  getById,
};
