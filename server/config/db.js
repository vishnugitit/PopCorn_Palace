const mysql = require("mysql2/promise");

console.log("HOST:", process.env.DB_HOST);
console.log("PORT:", process.env.DB_PORT);
console.log("DB:", process.env.DB_NAME);
console.log("USER:", process.env.DB_USER);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 60000,
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected successfully");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

module.exports = pool;