"use strict";

import express, {Request, Response, Express} from "express";
import {TestController} from "../controllers/test";
import {WebhookController} from "../controllers/webhook";
import {ExcelController} from "../controllers/excel";
import { SettingController } from "../controllers/setting";

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
  app.get("/setting/:jwt", SettingController);
  app.get("/xlsx/save", excelController.TestSaveExcel);
  app.get("/xlsx/download", excelController.TestDownloadExcel);
};


