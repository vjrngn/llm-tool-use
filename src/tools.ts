import {Chat} from "groq-sdk/resources";
import ChatCompletionTool = Chat.ChatCompletionTool;

export const tools = [
  {
    type: "function",
    function: {
      name: "get_current_weather",
      description: "Gets the current weather for a location",
      parameters: {
        city: {
          type: "string",
          description: "The city to get the weather for"
        },
        format: {
          type: "string",
          description: "The format to return the weather in. Ex: 'celsius', 'fahrenheit'",
          enum: ["celsius", "fahrenheit"],
          default: "celsius"
        }
      }
    }
  }
] satisfies ChatCompletionTool[]