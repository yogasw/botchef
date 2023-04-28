"use strict";

import { Request, Response, Express } from "express";
import { TestController } from "../controllers/test";
import {WebhookController} from "../controllers/webhook";

const webhookController = new WebhookController();

module.exports = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Botchef Server API");
  });
  app.get("/test", (req: Request, res: Response) => {
    TestController(req, res);
  });

  app.post("/webhook/appcenter", webhookController.AppCenter);
};

