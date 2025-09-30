const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,    // atau DataTypes.INTEGER.UNSIGNED jika mau unsigned
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },      
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  full_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM("admin", "user"),
    allowNull: false,
    defaultValue: "user"
  }
}, {
  tableName: "tbl_user",
  timestamps: true,       // createdAt & updatedAt otomatis
  paranoid: true          // deletedAt otomatis (soft delete)
});

module.exports = User;
