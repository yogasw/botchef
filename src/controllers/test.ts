import { GenerateBotTemplate } from "../repository/openai-repository";
import { Request, Response, Express } from "express";

export function TestController(req: Request, res: Response) {
  GenerateBotTemplate("Jasa Pembuatan Website")
    .then((response) => {
      return res.status(200).send(response);
    })
    .catch((error) => {
      return res.status(400).send(error);
    });
}
