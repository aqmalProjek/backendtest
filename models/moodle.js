const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Moodle = sequelize.define("Moodle", {
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: "tbl_moodle",
  timestamps: true,
  paranoid: true
});

// Relasi: Moodle milik 1 User
Moodle.belongsTo(User, { foreignKey: "user_id", as: "author" });
User.hasMany(Moodle, { foreignKey: "user_id", as: "moodles" });

module.exports = Moodle;
