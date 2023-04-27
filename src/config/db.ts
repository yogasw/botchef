require("dotenv").config();
const { DATABASE_URL, DEVELOP_MODE } = process.env;
module.exports = {
  url: DATABASE_URL,
  dialect: "postgres",
  logging: DEVELOP_MODE === "true",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};
