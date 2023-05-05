"use strict";

import express, {Request, Response, Express} from "express";
import {TestController} from "../controllers/test";
import {WebhookController} from "../controllers/webhook";
import {ExcelController} from "../controllers/excel";
import path from "path";

const webhookController = new WebhookController();
const excelController = new ExcelController();

module.exports = (app: Express) => {
  app.use(express.json());
  app.get("/", (req: Request, res: Response) => {
    res.send("Botchef Server API");
  });
  app.get("/test", (req: Request, res: Response) => {
    TestController(req, res);
  });

  app.post("/webhook/appcenter", webhookController.AppCenter);
  app.use(express.static(path.join(__dirname,"../../client-setting", "build")));
  app.get("/setting/:jwt", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client-setting","build", "index.html"));
  });
  app.get("/xlsx/save", excelController.TestSaveExcel);
  app.post("/xlsx/download", excelController.TestDownloadExcel);
};


