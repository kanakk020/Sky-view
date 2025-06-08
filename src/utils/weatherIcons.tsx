import React from 'react';
import { 
  Cloud, 
  CloudDrizzle, 
  CloudFog, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  Sun, 
  Wind,
  CloudSun
} from 'lucide-react';

export const getWeatherIcon = (iconCode: string, className = '', size = 24) => {
  // Map the OpenWeatherMap icon codes to Lucide icons
  switch (iconCode) {
    case '01d': // clear sky - day
      return <Sun size={size} className={`text-amber-500 ${className}`} />;
    case '01n': // clear sky - night
      return <Sun size={size} className={`text-amber-300 ${className}`} />;
    case '02d': // few clouds - day
    case '02n': // few clouds - night
      return <CloudSun size={size} className={`text-gray-500 ${className}`} />;
    case '03d': // scattered clouds - day
    case '03n': // scattered clouds - night
    case '04d': // broken clouds - day
    case '04n': // broken clouds - night
      return <Cloud size={size} className={`text-gray-500 ${className}`} />;
    case '09d': // shower rain - day
    case '09n': // shower rain - night
      return <CloudDrizzle size={size} className={`text-blue-500 ${className}`} />;
    case '10d': // rain - day
    case '10n': // rain - night
      return <CloudRain size={size} className={`text-blue-600 ${className}`} />;
    case '11d': // thunderstorm - day
    case '11n': // thunderstorm - night
      return <CloudLightning size={size} className={`text-purple-500 ${className}`} />;
    case '13d': // snow - day
    case '13n': // snow - night
      return <CloudSnow size={size} className={`text-blue-200 ${className}`} />;
    case '50d': // mist - day
    case '50n': // mist - night
      return <CloudFog size={size} className={`text-gray-400 ${className}`} />;
    default:
      return <Wind size={size} className={className} />;
  }
};

export const getTemperatureColor = (temp: number): string => {
  if (temp < 0) return 'text-blue-700';
  if (temp < 10) return 'text-blue-500';
  if (temp < 20) return 'text-blue-400';
  if (temp < 25) return 'text-green-500';
  if (temp < 30) return 'text-yellow-500';
  if (temp < 35) return 'text-orange-500';
  return 'text-red-600';
};

export const getWeatherBackground = (iconCode: string): string => {
  // Map the OpenWeatherMap icon codes to background classes
  const iconPrefix = iconCode.substring(0, 2);
  const isDaytime = iconCode.endsWith('d');
  
  switch (iconPrefix) {
    case '01': // clear sky
      return isDaytime ? 'bg-gradient-to-b from-blue-400 to-blue-200' : 'bg-gradient-to-b from-night-900 to-night-800';
    case '02': // few clouds
    case '03': // scattered clouds
      return isDaytime ? 'bg-gradient-to-b from-blue-500 to-blue-300' : 'bg-gradient-to-b from-night-900 to-night-800';
    case '04': // broken clouds
      return isDaytime ? 'bg-gradient-to-b from-blue-600 to-blue-400' : 'bg-gradient-to-b from-night-900 to-night-800';
    case '09': // shower rain
    case '10': // rain
      return isDaytime ? 'bg-gradient-to-b from-blue-700 to-blue-500' : 'bg-gradient-to-b from-night-950 to-night-900';
    case '11': // thunderstorm
      return isDaytime ? 'bg-gradient-to-b from-gray-700 to-gray-500' : 'bg-gradient-to-b from-night-950 to-purple-900';
    case '13': // snow
      return isDaytime ? 'bg-gradient-to-b from-blue-100 to-blue-50' : 'bg-gradient-to-b from-night-900 to-blue-900';
    case '50': // mist
      return isDaytime ? 'bg-gradient-to-b from-gray-400 to-gray-300' : 'bg-gradient-to-b from-night-900 to-gray-800';
    default:
      return isDaytime ? 'bg-gradient-to-b from-blue-500 to-blue-300' : 'bg-gradient-to-b from-night-900 to-night-800';
  }
};