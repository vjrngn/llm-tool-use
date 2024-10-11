/**
 * This module defines the functions that will be used as tools.
 */

import {callWeatherApi, weatherApi} from "../weather-map-http-client";

/**
 * Returns the lat and lon of a city
 * @param city The city to get the coordinates for
 */
export async function getCityCoordinates(city: string) {
  const response = await weatherApi.get(`/geo/1.0/direct?q=${city}`);
  const { data } = response;

  const { lat, lon } = data[0];
  return { lat, lon };
}

/**
 * Returns the current weather for a city in the specified format
 * @param args
 */
export async function getCurrentWeather(args: { city: string, format: string }) {
  const { lat, lon } = await getCityCoordinates(args.city);
  return callWeatherApi({ lat, long: lon, format: args.format });
}

