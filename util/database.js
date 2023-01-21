const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "expense",
  process.env.Sequelize_User,
  process.env.Sequelize_Password,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;
