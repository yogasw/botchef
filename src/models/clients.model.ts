import {sequelize} from "./db";
import {DataTypes, Model} from "sequelize";

export const Client = sequelize.define("clients", {
    app_code: {
        primaryKey: true,
        type: DataTypes.TEXT
    },
    app_secret: DataTypes.STRING,
    app_name: DataTypes.STRING,
    admin_email: DataTypes.STRING,
    admin_token: DataTypes.STRING,
    qiscus_sdk_token: DataTypes.STRING,
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
});