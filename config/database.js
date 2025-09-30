const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,    // database name
  process.env.DB_USER,    // username
  process.env.DB_PASS,    // password
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false // kalau mau lihat query ubah ke true
  }
);

// Cek koneksi
sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ DB connection error:", err));

module.exports = sequelize;
