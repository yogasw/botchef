"use strict";

import { Request, Response, Express } from "express";
import { TestController } from "../controllers/test";

module.exports = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Botchef Server API");
  });
  app.get("/test", (req: Request, res: Response) => {
    TestController(req, res);
  });
};

