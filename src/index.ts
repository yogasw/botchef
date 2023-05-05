import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import db from "./models";
const cors = require('cors');
const routes = require("./routes");
dotenv.config();

const app: Express = express();
// CORS middleware
const port = process.env.PORT;
app.use(cors());
app.options('*', cors());
routes(app);


// Sync the User table with the database schema
db.sequelize.sync({ alter: true, logging: console.log })
  .then(() => {
    console.log('User table synced successfully');
  })
  .catch((error: any) => {
    console.log('Error syncing User table:', error);
  });
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
