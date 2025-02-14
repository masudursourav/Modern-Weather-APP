export const APIConfig = {
  apiBaseUrl: "https://api.openweathermap.org/data/2.5",
  geoCodingBaseUrl: "https://api.openweathermap.org/geo/1.0",
  API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY,
  DEFAULT_PARAMS: {
    units: "metric",
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
  },
};
