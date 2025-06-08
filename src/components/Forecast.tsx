import React from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { getWeatherIcon, getTemperatureColor } from '../utils/weatherIcons';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const Forecast = () => {
  const { weatherData } = useWeather();

  if (!weatherData || !weatherData.forecast) return null;

  return (
    <motion.div 
      className="weather-card mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">4-Day Forecast</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {weatherData.forecast.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const dayName = format(date, 'EEE');
          const iconCode = day.weather[0].icon;
          const temp = Math.round(day.main.temp);
          const tempColor = getTemperatureColor(temp);
          
          return (
            <motion.div 
              key={day.dt}
              className="text-center p-3 rounded-lg bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <p className="font-medium text-gray-700 dark:text-gray-200">{dayName}</p>
              <div className="my-2 flex justify-center">
                {getWeatherIcon(iconCode, 'animate-float-slow', 36)}
              </div>
              <p className={`text-xl font-bold ${tempColor}`}>{temp}°</p>
              <p className="text-xs mt-1 capitalize text-gray-600 dark:text-gray-300">
                {day.weather[0].description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Forecast;