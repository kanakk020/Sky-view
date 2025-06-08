import React, { useState, useEffect } from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { getWeatherIcon, getTemperatureColor } from '../utils/weatherIcons';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Clock, Thermometer } from 'lucide-react';

const CurrentWeather = () => {
  const { weatherData } = useWeather();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  if (!weatherData) return null;

  const { main, weather, timezone } = weatherData;
  const weatherDescription = weather[0].description;
  const iconCode = weather[0].icon;
  const temperature = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);
  const temperatureColor = getTemperatureColor(temperature);
  
  // Convert current time to location's timezone
  const localTime = new Date(currentTime.getTime() + (timezone * 1000) + (currentTime.getTimezoneOffset() * 60000));
  const formattedTime = format(localTime, 'h:mm:ss a');
  const formattedDate = format(localTime, 'EEEE, MMMM d, yyyy');

  return (
    <motion.div 
      className="weather-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <div className="flex items-center justify-center md:justify-start">
            <Clock size={18} className="mr-2 text-gray-600 dark:text-gray-300" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{formattedTime}</span>
          </div>
          <h2 className="text-xl font-medium mt-1 text-gray-800 dark:text-white">{formattedDate}</h2>
          <div className="mt-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-sm">
              {getWeatherIcon(iconCode, 'mr-1', 18)}
              <span className="text-sm capitalize text-gray-700 dark:text-gray-200">
                {weatherDescription}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex flex-col items-center mr-6">
            {getWeatherIcon(iconCode, 'animate-float', 64)}
          </div>
          <div className="text-center">
            <h1 className={`text-6xl font-bold ${temperatureColor}`}>
              {temperature}°
            </h1>
            <div className="flex items-center mt-1 justify-center">
              <Thermometer size={16} className="mr-1 text-gray-600 dark:text-gray-300" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Feels like {feelsLike}°
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="text-center p-2 rounded-lg bg-white/20 dark:bg-black/20">
          <p className="text-xs text-gray-600 dark:text-gray-300">High</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            {Math.round(main.temp_max)}°
          </p>
        </div>
        <div className="text-center p-2 rounded-lg bg-white/20 dark:bg-black/20">
          <p className="text-xs text-gray-600 dark:text-gray-300">Low</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            {Math.round(main.temp_min)}°
          </p>
        </div>
        <div className="text-center p-2 rounded-lg bg-white/20 dark:bg-black/20">
          <p className="text-xs text-gray-600 dark:text-gray-300">Humidity</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            {main.humidity}%
          </p>
        </div>
        <div className="text-center p-2 rounded-lg bg-white/20 dark:bg-black/20">
          <p className="text-xs text-gray-600 dark:text-gray-300">Pressure</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            {main.pressure} hPa
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;