import {SequalizeDB, sequelize} from "./db";
import Sequelize from "sequelize";

const db: SequalizeDB = {
    apps: require("./apps.model")(sequelize, Sequelize),
    sequelize: sequelize,
};

export default db
