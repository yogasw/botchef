require("dotenv").config();
const db = {
  apps: undefined,
  sequelize: undefined,
  Sequelize: undefined
};
const dbConfig = require("../config/db");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.url, {
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
  operatorsAliases: false,
  logging: dbConfig.logging,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

db.sequelize = sequelize;
db.apps = require("./apps.model")(sequelize, Sequelize);

module.exports = db;

