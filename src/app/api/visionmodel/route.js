// pages/api/paraphrase.js
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: "r8_6IrPYbUMuUxtzJktGMCivqJptQMiI1e3GAy5C",
});

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");
  const prompt = data.get("prompt");
  let imageavilable = false;
  let result;
  try {
    if (file && file.name) {
      if (!file.type.includes("image")) {
        return NextResponse.json({ message: "Select image" });
      }
      imageavilable = true;
      result = await replicate.run(
        "yorickvp/llava-13b:e272157381e2a3bf12df3a8edd1f38d1dbd736bbb7437277c8b34175f8fce358",
        {
          input: {
            top_p: 1,
            image: file,
            prompt: prompt,
            max_tokens: 1024,
            temperature: 0.2,
          },
        }
      );
    } else {
      result = await replicate.run(
        "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
        input={
          "prompt": prompt,
          "max_new_tokens": 250
        }
      );
    }
    return NextResponse.json({ result, imageavilable });
  } catch (error) {
    return NextResponse.json({
      error: "Internal Server Error",
      details: error.message || error,
    });
  }
}
