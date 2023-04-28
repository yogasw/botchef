import {Request, Response} from 'express';
import {Client} from "../models/clients.model";

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
    AppCenter = async (req: AppCenterReq, resp: Response) => {
        // TODO: save to DB or something
        try {
            const newClient = await Client.upsert(req.body)
            return resp.status(200).send({
                status: "ok",
                data: newClient,
            })
        } catch (e: any) {
            console.log(e)
            return resp.status(500).send({
                message: "internal server error",
                reasons: e.message
            })
        }
    };
}