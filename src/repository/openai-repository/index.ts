require("dotenv").config();
import { CreateCompletionRequest } from "openai/api";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export async function GenerateBotTemplate(description: string): Promise<CreateCompletionRequest> {
  return new Promise((resolve, reject) => {
    const prompt = `
buatkan saya template bot text untuk ${description} dalam result json object
1. 5 menu
2. nama intent dan training pharse 
3. serta response text nya
4. ketika greeting harus memberikan list menu yang tersedia
5. jawaban harus berupa json object saja tidak boleh ada string lain
6. response harus berupa text
7. harus selalu membawa satu intent dengan is_fallback true

Type your response here:
{
    intent:        string;
    response:      string;
    training:      string[];
    is_fallback:   boolean;
    context:       string;
    input_context: string;
}

Example Response:
[
  {
    "intent": "fallback",
    "response": "maaf saya tidak mengerti, silahkan balas halo/hai untuk memulai",
    "training": [],
    "is_fallback": true,
    "context": "fallback",
    "input_context": ""
  },
  {
    "intent": "greeting",
    "response": "selamat datang di chatbot restoran ku, pilih 1. informasi menu hari ini 2. info harga menu ayam bakar,",
    "training": [
      "hai",
      "halo",
      "selamat pagi"
    ],
    "is_fallback": false,
    "context": "greeting",
    "input_context": ""
  },
  {
    "is_fallback": false,
    "input_context": "greeting",
    "context": "menu_hari_ini",
    "intent": "menu_hari_ini",
    "response": "menu hari ini adalah nasi goreng dan nasi rendang",
    "training": [
      "1",
      "satu",
      "menu",
      "apa saja menu hari ini"
    ]
  },
  {
    "is_fallback": false,
    "input_context": "greeting",
    "context": "menu_ayam_bakar",
    "intent": "menu_ayam_bakar",
    "response": "untuk menu ayam bakar 15ribu",
    "training": [
      "dua",
      "2",
      "harga ayam bakar"
    ]
  }
]
  `;
    // https://platform.openai.com/docs/models/model-endpoint-compatibility
    openai.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    })
      .then((result: CreateCompletionRequest) => {
        // @ts-ignore
        let message = result?.data?.choices[0].message?.content;
        resolve(result);
      })
      .catch((e: any) => {
        reject(e);
      });
  });
}
