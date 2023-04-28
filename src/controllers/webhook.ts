import {Request, Response} from 'express';

type AppCenterPayload = {
  app_code: string
  app_secret: string
  app_name: string
  admin_email: string
  admin_token: string
  qiscus_sdk_token: string
}

type AppCenterReq = {
  body: AppCenterPayload
} & Request

export class WebhookController {
  AppCenter = (req: AppCenterReq, resp: Response) => {
    // TODO: save to DB or something
  };
}