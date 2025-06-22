import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

console.log(process.env.GEMINI_API_KEY);
export const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function main() {
  const response = await ai
    .getGenerativeModel({ model: "gemini-2.5-flash" })
    .generateContent("");
  console.log(response.response.text());
}

