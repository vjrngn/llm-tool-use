import axios from "axios";

export const weatherApi = axios.create({
  baseURL: "http://api.openweathermap.org",
  params: {
    appid: process.env.OPENWEATHERMAP_API_KEY,
  }
})

export async function callWeatherApi(args: { lat: number; long: number; format: string }) {
  const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
    params: {
      latitude: args.lat,
      longitude: args.long,
      current: 'temperature_2m',
      temperature_unit: args.format
    }
  })
  return response.data.current;
}
