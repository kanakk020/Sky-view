import axios from 'axios';
import { WeatherData, LocationData, ForecastData } from '../types/weather';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

if (!API_KEY) {
  throw new Error('Weather API key is not defined in environment variables');
}

export const fetchWeatherData = async (query: string): Promise<WeatherData> => {
  try {
    // Determine if query is coordinates or city name
    let endpoint = '';
    if (query.includes(',')) {
      const [lat, lon] = query.split(',').map(coord => parseFloat(coord.trim()));
      endpoint = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    } else {
      endpoint = `${BASE_URL}/weather?q=${query}&units=metric&appid=${API_KEY}`;
    }

    const weatherResponse = await axios.get(endpoint);
    const weatherData = weatherResponse.data;
    
    // Get forecast data
    const forecastEndpoint = `${BASE_URL}/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&units=metric&appid=${API_KEY}`;
    const forecastResponse = await axios.get(forecastEndpoint);
    
    // Extract one forecast per day (excluding only the current day)
    const forecastList = forecastResponse.data.list as ForecastData[];
    const dailyForecasts: ForecastData[] = [];
    const currentDate = new Date().toISOString().split('T')[0];
    
    for (const forecast of forecastList) {
      const forecastDate = forecast.dt_txt.split(' ')[0];
      
      // Skip if it's the current day
      if (forecastDate === currentDate) {
        continue;
      }
      
      // Add forecast if we haven't added one for this date yet
      if (!dailyForecasts.find(f => f.dt_txt.split(' ')[0] === forecastDate)) {
        dailyForecasts.push(forecast);
      }
      
      // Break if we have enough forecasts (next 4 days)
      if (dailyForecasts.length >= 4) break;
    }
    
    return { ...weatherData, forecast: dailyForecasts };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};

export const getLocationFromCoords = async (lat: number, lon: number): Promise<LocationData> => {
  try {
    const endpoint = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;
    const response = await axios.get(endpoint);
    const locationData = response.data[0];
    
    return {
      name: locationData.name,
      lat,
      lon
    };
  } catch (error) {
    console.error('Error getting location from coordinates:', error);
    throw new Error('Failed to get location data');
  }
};