import { APIConfig } from "./apiConfig";
import {
  Coordinates,
  ForecastData,
  GeocodingResponse,
  WeatherData,
} from "./types";

class WeatherAPI {
  private createURL(
    endpoints: string,
    params: Record<string, string | number>
  ) {
    const searchParams = new URLSearchParams({
      appid: APIConfig.API_KEY,
      ...params,
    });
    return `${endpoints}?${searchParams.toString()}`;
  }
  private async fetchWeatherData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
  async getWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
    const url = this.createURL(`${APIConfig.apiBaseUrl}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: APIConfig.DEFAULT_PARAMS.units,
    });
    return this.fetchWeatherData<WeatherData>(url);
  }
  async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
    const url = this.createURL(`${APIConfig.apiBaseUrl}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: APIConfig.DEFAULT_PARAMS.units,
    });
    return this.fetchWeatherData<ForecastData>(url);
  }
  async reverseGeocode({
    lat,
    lon,
  }: Coordinates): Promise<GeocodingResponse[]> {
    const url = this.createURL(`${APIConfig.geoCodingBaseUrl}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: 1,
    });
    return this.fetchWeatherData<GeocodingResponse[]>(url);
  }
}

export const weatherAPI = new WeatherAPI();
