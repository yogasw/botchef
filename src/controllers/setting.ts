import { Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { Client } from "../models/clients.model";

export async function SettingController(req: Request, resp: Response) {
  const { jwt } = req.params;
  let app_code: string = "";
  try {
    let payload = verifyToken(jwt);
    app_code = payload.app_code;
    const app = await Client.findOne({
      where: {
        app_code: app_code
      }
    });
    if (!app) {
      return resp.status(401).send({
        status: "error",
        message: "unauthorized"
      });
    }
    const { app_secret, admin_token } = app.dataValues;

    return resp.render('setting');
    // return resp.status(200).send({
    //   status: "ok",
    //   data: app
    // });
  } catch (e) {
    return resp.status(401).send({
      status: "error",
      message: "unauthorized"
    });
  }


  // return resp.status(200).send({
  //   status: "ok",
  //   data: jwt
  // });
}
