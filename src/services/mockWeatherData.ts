import { WeatherData } from '../types/weather';

export const mockWeatherData = {
  coord: {
    lon: 77.2090,
    lat: 28.6139
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d"
    }
  ],
  base: "stations",
  main: {
    temp: 32,
    feels_like: 34,
    temp_min: 30,
    temp_max: 35,
    pressure: 1015,
    humidity: 45
  },
  visibility: 10000,
  wind: {
    speed: 3.6,
    deg: 160
  },
  clouds: {
    all: 0
  },
  dt: 1684926645,
  sys: {
    type: 2,
    id: 2075535,
    country: "IN",
    sunrise: 1684888981,
    sunset: 1684937798
  },
  timezone: 19800,
  id: 1261481,
  name: "New Delhi",
  cod: 200
};

export default mockWeatherData;