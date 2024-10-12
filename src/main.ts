import Groq from "groq-sdk";
import {Chat} from "groq-sdk/resources";
import ChatCompletionMessageParam = Chat.ChatCompletionMessageParam;
import {tools} from "./tools";
import {log} from "./utils";
import {getCurrentWeather} from "./tools/weather";
import {ChatCompletionToolMessageParam} from "groq-sdk/resources/chat";

async function prompt(messages: any[], tools: any[]) {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  return groq.chat.completions.create({
    model: "llama3-groq-70b-8192-tool-use-preview",
    tools: tools,
    messages: messages,
    temperature: 0.2,
  })
}

const toolMap = {
  'get_current_weather': getCurrentWeather
}

async function main() {
  const city = process.argv[2] || "Bangalore";
  const format = process.argv[3] || "celsius";

  const messages = [
    {
      role: "system",
      content: `
        You are a helpful assistant. You know how to effectively use tools. 
        You have access to the following tools. Use them when required to satisfy the users' requests.
        `
    },
    {
      "role": "user",
      "content": `What is the weather in ${city} in ${format}?`
    }
  ] satisfies ChatCompletionMessageParam[];

  const response = await prompt(messages, tools);

  // log(response.choices[0]);

  const aiResponse = response.choices[0].message;

  if (aiResponse.tool_calls.length > 0) {
    const toolCall = aiResponse.tool_calls[0];
    const toolName = toolCall.function.name;
    const selectedTool = toolMap[toolName];
    const toolResult = await selectedTool(JSON.parse(toolCall.function.arguments));

    const toolCallMessage: ChatCompletionToolMessageParam = {
      role: "tool",
      content: JSON.stringify(toolResult),
      tool_call_id: toolCall.id
    }
    messages.push(toolCallMessage);

    const finalResponse = await prompt(messages, tools)

    console.log(finalResponse.choices[0].message.content);
  }
}

main();
