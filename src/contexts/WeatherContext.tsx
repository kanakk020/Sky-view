import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchWeatherData, getLocationFromCoords } from '../services/weatherService';
import { WeatherData, LocationData } from '../types/weather';

interface WeatherContextType {
  weatherData: WeatherData | null;
  location: LocationData;
  loading: boolean;
  error: string | null;
  fetchWeather: (query: string) => Promise<void>;
  setLocation: (location: LocationData) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<LocationData>({ 
    name: 'New Delhi', 
    lat: 28.6139, 
    lon: 77.2090 
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // If query is a location name, not coordinates
      if (isNaN(parseFloat(query.split(',')[0]))) {
        const data = await fetchWeatherData(query);
        setWeatherData(data);
        setLocation({ 
          name: data.name, 
          lat: data.coord.lat, 
          lon: data.coord.lon 
        });
      } else {
        // If query is coordinates (lat,lon)
        const [lat, lon] = query.split(',').map(coord => parseFloat(coord.trim()));
        const locationData = await getLocationFromCoords(lat, lon);
        const data = await fetchWeatherData(`${lat},${lon}`);
        setWeatherData(data);
        setLocation({ 
          name: locationData.name, 
          lat, 
          lon 
        });
      }
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Unable to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather data for initial location on component mount
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const locationData = await getLocationFromCoords(latitude, longitude);
              setLocation({ 
                name: locationData.name, 
                lat: latitude, 
                lon: longitude 
              });
              await fetchWeather(`${latitude},${longitude}`);
            } catch (err) {
              console.error('Error getting user location:', err);
              // Fall back to default location
              fetchWeather(location.name);
            }
          },
          (error) => {
            console.error('Geolocation error:', error);
            // Fall back to default location
            fetchWeather(location.name);
          }
        );
      } else {
        // Geolocation not supported, use default location
        fetchWeather(location.name);
      }
    };

    getUserLocation();
  }, []);

  const value = {
    weatherData,
    location,
    loading,
    error,
    fetchWeather,
    setLocation,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};