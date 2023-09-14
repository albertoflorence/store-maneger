const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'StoreManager',
  connectionLimit: 10,
  port: 3306,
});

module.exports = connection;
