import xlsx, { ISettings } from "json-as-xlsx";
import { Request, Response } from "express";
import { IntentData } from "./model/bot";
import { CustomSheet, IntentExcel } from "./model/excel";
import { GenerateBotTemplate } from "../repository/openai-repository";

export class ExcelController {
  private data: IntentData[];

  constructor() {
    this.data = [
      {
        intent: "greeting",
        response: "selamat datang di chatbot restoran ku, pilih 1 informasi 2 untuk menu,",
        training: [
          "hai",
          "halo"
        ],
        context: "greeting",
        is_fallback: false
      },
      {
        intent: "menu",
        response: "menu hari ini adalah nasi goreng",
        training: [
          "menu",
          "apa saja menu hari ini"
        ],
        input_context: "greeting",
        context: "menu",
        is_fallback: false
      }
    ];
  }

  TestSaveExcel = (req: Request, res: Response) => {
    const newData = this.data.map(intent => {
      return intent.training.map((input, index, array) => {
        let excelContent: IntentExcel = {
          input: input
        };

        if (index != 0) {
          return excelContent;
        }

        excelContent = {
          ...excelContent,
          intent: intent.intent,
          parent: intent.input_context,
          is_fallback: intent.is_fallback,
          back_to_parent: false,
          tag: "",
          response: intent.response,
          response_type: "text"
        };

        return excelContent;
      });
    });

    let contents = newData.reduce((a, b) => [...a, ...b], []);

    const excelFormat: CustomSheet[] = [
      {
        sheet: "1_bot_flow",
        columns: [
          { label: "intent_name", value: (row: IntentExcel) => row.intent },
          { label: "input", value: (row: IntentExcel) => row.input },
          { label: "response", value: (row: IntentExcel) => (row.response) },
          { label: "response_type", value: (row: IntentExcel) => (row.response_type) },
          { label: "parent", value: (row: IntentExcel) => (row.parent) },
          { label: "back_to_parent", value: (row: IntentExcel) => (row.is_fallback) },
          { label: "tag", value: (row: IntentExcel) => (row.is_fallback) },
          { label: "is_fallback", value: (row: IntentExcel) => (row.is_fallback) }
        ],
        content: contents
      },
      {
        sheet: "9_engine_config",
        columns: [
          { label: "platform", value: (row: any) => row.platform },
          { label: "timezone", value: (row: any) => row.timezone },
          { label: "default_language_code", value: (row: any) => row.label }
        ],
        content: [
          { platform: "dialogflow", timezone: "Asia/Bangkok", label: "id" }
        ]
      }
    ];

    let settings = {
      fileName: req.body.filename, // Name of the resulting spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      writeOptions: {} // Style options from https://docs.sheetjs.com/docs/api/write-options
    };

    xlsx(excelFormat, settings);

    return res.status(200).send(excelFormat);
  };

  TestDownloadExcel = async (req: Request, res: Response) => {
    let intents: any[] = [];
    await GenerateBotTemplate(req.body.description)
      .then((response) => {
        try {
          // @ts-ignore
          intents = JSON.parse(response?.data?.choices[0].message.content);
        } catch (e) {
          console.log(e);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // @ts-ignore
    const newData = intents.map(intent => {
      // @ts-ignore
      return intent.training.map((input, index, array) => {
        let excelContent: IntentExcel = {
          input: input
        };

        if (index != 0) {
          return excelContent;
        }

        excelContent = {
          ...excelContent,
          intent: intent?.intent,
          parent: intent?.input_context,
          is_fallback: intent?.is_fallback,
          back_to_parent: false,
          tag: "",
          response: intent?.response,
          response_type: "text"
        };

        return excelContent;
      });
    });

    // @ts-ignore
    let contents = newData.reduce((a, b) => [...a, ...b], []);

    const excelFormat: CustomSheet[] = [
      {
        sheet: "1_bot_flow",
        columns: [
          { label: "intent_name", value: (row: IntentExcel) => row.intent },
          { label: "input", value: (row: IntentExcel) => row.input },
          { label: "response", value: (row: IntentExcel) => (row.response) },
          { label: "response_type", value: (row: IntentExcel) => (row.response_type) },
          { label: "parent", value: (row: IntentExcel) => (row.parent) },
          { label: "back_to_parent", value: (row: IntentExcel) => (row.is_fallback) },
          { label: "tag", value: (row: IntentExcel) => (row.is_fallback) },
          { label: "is_fallback", value: (row: IntentExcel) => (row.is_fallback) }
        ],
        content: contents
      },
      {
        sheet: "9_engine_config",
        columns: [
          { label: "platform", value: (row: any) => row.platform },
          { label: "timezone", value: (row: any) => row.timezone },
          { label: "default_language_code", value: (row: any) => row.label }
        ],
        content: [
          { platform: "dialogflow", timezone: "Asia/Bangkok", label: "id" }
        ]
      }
    ];

    // @ts-ignore
    let settings: ISettings = {
      fileName: (req.query.filename ?? "Spreadsheet") as string, // Name of the resulting spreadsheet
      writeOptions: {
        type: "buffer",
        bookType: "xlsx"
      } // Style options from https://docs.sheetjs.com/docs/api/write-options
    };

    const buffer = xlsx(excelFormat, settings);

    return res.writeHead(200, {
      "Content-Type": "application/octet-stream",
      "Content-disposition": `attachment; filename=${settings.fileName}.xlsx`
    }).end(buffer);
  };
}
