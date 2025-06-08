import React from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { motion } from 'framer-motion';
import { Wind, Droplets, Eye } from 'lucide-react';

const WeatherDetails = () => {
  const { weatherData } = useWeather();

  if (!weatherData) return null;

  const { wind, visibility } = weatherData;
  
  // Convert wind direction from degrees to cardinal direction
  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };
  
  const windDirection = getWindDirection(wind.deg);

  return (
    <motion.div 
      className="weather-card h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Weather Details</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Wind size={20} className="mr-2 text-blue-500" />
            <span className="text-gray-700 dark:text-gray-200">Wind</span>
          </div>
          <span className="text-gray-800 dark:text-white font-medium">
            {Math.round(wind.speed * 3.6)} km/h {windDirection}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Droplets size={20} className="mr-2 text-blue-500" />
            <span className="text-gray-700 dark:text-gray-200">Humidity</span>
          </div>
          <span className="text-gray-800 dark:text-white font-medium">
            {weatherData.main.humidity}%
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Eye size={20} className="mr-2 text-blue-500" />
            <span className="text-gray-700 dark:text-gray-200">Visibility</span>
          </div>
          <span className="text-gray-800 dark:text-white font-medium">
            {(visibility / 1000).toFixed(1)} km
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherDetails;