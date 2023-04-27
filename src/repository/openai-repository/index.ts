require("dotenv").config();
import { CreateCompletionRequest } from "openai/api";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export async function GenerateBotTemplate(): Promise<CreateCompletionRequest> {
  return new Promise((resolve, reject) => {
    const prompt = `
buatkan saya template bot text untuk jasa foto copy dalam result json object
1. 5 menu
2. nama intent dan training pharse 
3. serta response text nya
4. ketika greeting harus memberikan list menu yang tersedia
5. jawaban harus berupa json object saja tidak boleh ada string lain
[
  {
    "intent": "greeting",
    "response": "selamat datang di chatbot restoran ku, pilih 1 informasi 2 untuk menu,",
    "training": [
      "hai",
      "halo",
    ],
    "context": "greeting"
  },
  {
    "input_context": "greeting",
    "context": "menu",
    "intent": "menu",
    "response": "menu hari ini adalah nasi goreng",
    "training": [
      "menu",
      "apa saja menu hari ini",
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
          content: prompt,
        }
      ],
    })
      .then((result: CreateCompletionRequest) => {
      // @ts-ignore
        let message = result?.data?.choices[0].message?.content
        resolve(result);
      })
      .catch((e: any) => {
        reject(e);
      });
  });
}
