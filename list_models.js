import { GoogleGenerativeAI } from "@google/generative-ai";

async function run() {
  const models = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_API_KEY_HERE`)
  const data = await models.json();
  console.log(data);
}
run();
