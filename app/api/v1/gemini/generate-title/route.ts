// app/api/generate-title/route.ts

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { query } = await req.json();

  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

  const resp = await model.generateContent(
    `Hey I will give you blog title, you have to give me a better title or complete it. Only respond with the new title. Query title: ${query}`
  );

  const text = resp.response.text().trim();

  return NextResponse.json({ title: text },{status:200});
}
