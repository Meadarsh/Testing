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
  "01-ai/yi-6b-chat:14efadfaf772f45ee74c14973007cbafab3ccac90169ec96a9fc7a804253535d",
        {
          input: {
            top_k: 50,
            top_p: 1,
            prompt: prompt,
            temperature: 0.75,
            prompt_template:"<|im_start|>system\nYou are a helpful assistant<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant\n",
            max_new_tokens: 800,
            min_new_tokens: -1,
            repetition_penalty: 1.2,
          },
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
