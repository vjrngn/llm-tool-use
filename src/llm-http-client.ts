import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:11434/api/chat",
});

export {
  client,
}
