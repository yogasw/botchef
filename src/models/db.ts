import Sequelize from "sequelize";
// @ts-ignore
import dbConfig from "../config/db";

export type SequalizeDB = {
  apps: any,
  sequelize: any,
};

// @ts-ignore
export const sequelize = new Sequelize(dbConfig.url, {
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