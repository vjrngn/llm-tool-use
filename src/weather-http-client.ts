import axios from "axios";

export async function getGeoLocation(city: string) {
  const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
    params: {
      name: city
    }
  });

  const { data }  = response;
  return {
    lat: data.results[0].latitude,
    lon: data.results[0].longitude
  }
}

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
