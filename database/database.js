import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'node',
  password: 'Sportclub',
  database: 'club',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if(err) {
    console.error("Something went wrong connecting to the database ...");
    throw err;
  }
  if(connection) connection.release();
  return;
});

export default pool;