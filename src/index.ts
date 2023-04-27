import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const routes = require("./routes");
const db = require("./models");
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
routes(app);

db.sequelize.sync({ force: true })
  .then(() => {
    console.log("success sync db");
  })
  .catch((e: any) => {
    console.log("error sequelize sync", e);
  });

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
