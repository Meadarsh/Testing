// pages/api/paraphrase.js
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: "r8_6IrPYbUMuUxtzJktGMCivqJptQMiI1e3GAy5C",
});

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");
  const prompt= data.get("prompt");

  let result;
 try {
    if (file && file.name) {
      if (!file.type.includes("image")) {
        return NextResponse.json({message:"Select image"});
      }

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
        "lucataco/llama-2-7b-chat:6ab580ab4eef2c2b440f2441ec0fc0ace5470edaf2cbea50b8550aec0b3fbd38",
        {
          input: {
            top_p: 0.95,
            prompt:prompt,
            temperature: 0.75,
            system_prompt: "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe.  Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature. If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
            max_new_tokens: 225,
            repetition_penalty: 1.1
          }
        }
      );
    }
    return NextResponse.json(result);
  } 
  catch (error) {
    return NextResponse.json({ error: "Internal Server Error", details: error.message || error });
  }}