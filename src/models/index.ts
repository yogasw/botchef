import {SequalizeDB, sequelize} from "./db";

require("dotenv").config();
const db: SequalizeDB = {
    sequelize: undefined,
};
const Sequelize = require("sequelize");

db.sequelize = sequelize;
db.apps = require("./apps.model")(sequelize, Sequelize);

module.exports = db;

