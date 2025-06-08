import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useWeather } from '../contexts/WeatherContext';
import { motion } from 'framer-motion';

type TimePeriod = 'dawn' | 'morning' | 'noon' | 'evening' | 'dusk' | 'night' | 'day';

const Background: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { weatherData } = useWeather();

  // Get the current time period based on weather data time
  const getTimePeriod = (): TimePeriod => {
    if (!weatherData?.dt || !weatherData?.sys?.sunrise || !weatherData?.sys?.sunset) {
      console.log('Missing required weather data');
      return 'day';
    }

    const currentTime = weatherData.dt;
    const sunrise = weatherData.sys.sunrise;
    const sunset = weatherData.sys.sunset;

    // Calculate dawn and dusk times (30 minutes before sunrise and after sunset)
    const dawnStart = sunrise - (30 * 60);
    const dawnEnd = sunrise + (30 * 60);
    const duskStart = sunset - (30 * 60);
    const duskEnd = sunset + (30 * 60);

    // Calculate day periods
    const noonStart = sunrise + ((sunset - sunrise) / 3); // Split day into thirds
    const eveningStart = sunrise + (2 * (sunset - sunrise) / 3);

    console.log('Time data:', {
      current: new Date(currentTime * 1000).toLocaleTimeString(),
      sunrise: new Date(sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(sunset * 1000).toLocaleTimeString(),
      location: weatherData.name
    });

    // Determine time period
    if (currentTime < dawnStart || currentTime > duskEnd) {
      console.log('Night period');
      return 'night';
    }
    if (currentTime >= dawnStart && currentTime < dawnEnd) {
      console.log('Dawn period');
      return 'dawn';
    }
    if (currentTime >= dawnEnd && currentTime < noonStart) {
      console.log('Morning period');
      return 'morning';
    }
    if (currentTime >= noonStart && currentTime < eveningStart) {
      console.log('Noon period');
      return 'noon';
    }
    if (currentTime >= eveningStart && currentTime < duskStart) {
      console.log('Evening period');
      return 'evening';
    }
    if (currentTime >= duskStart && currentTime <= duskEnd) {
      console.log('Dusk period');
      return 'dusk';
    }
    
    console.log('Default to day period');
    return 'day';
  };

  const timePeriod = getTimePeriod();
  const isNight = timePeriod === 'night' || isDarkMode;

  // Check if it's raining
  const isRaining = weatherData?.weather?.[0]?.main?.toLowerCase().includes('rain') ?? false;

  // Get background gradient based on time period
  const getBackgroundGradient = () => {
    console.log('Current time period:', timePeriod);
    
    if (isDarkMode) return 'bg-gradient-to-b from-night-950 via-night-900 to-night-800';
    
    switch (timePeriod) {
      case 'dawn':
        return 'bg-gradient-to-b from-purple-900 via-pink-500 to-orange-300';
      case 'morning':
        return 'bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200';
      case 'noon':
        return 'bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300';
      case 'evening':
        return 'bg-gradient-to-b from-orange-400 via-pink-500 to-purple-500';
      case 'dusk':
        return 'bg-gradient-to-b from-purple-600 via-purple-900 to-blue-900';
      case 'night':
        return 'bg-gradient-to-b from-night-950 via-night-900 to-night-800';
      default:
        return 'bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200';
    }
  };

  // Generate stars for night mode
  const generateStars = () => {
    const stars = [];
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
      const size = Math.random() * 2 + 1;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 3 + 3;
      
      stars.push(
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: size + 'px',
            height: size + 'px',
            left: left + '%',
            top: top + '%',
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      );
    }
    
    return stars;
  };

  // Generate clouds
  const generateClouds = () => {
    const clouds = [];
    const cloudCount = 6;
    
    for (let i = 0; i < cloudCount; i++) {
      const left = Math.random() * 100;
      const top = Math.random() * 60;
      const delay = Math.random() * 10;
      const duration = Math.random() * 60 + 60;
      const opacity = Math.random() * 0.3 + 0.1;
      
      clouds.push(
        <motion.div
          key={i}
          className="absolute cloud"
          style={{
            width: '300px',
            height: '100px',
            left: left + '%',
            top: top + '%',
            opacity: opacity,
            backgroundColor: isNight ? '#1e293b' : 'white',
            borderRadius: '50px',
          }}
          animate={{
            left: [left + '%', (left > 50 ? -20 : 120) + '%'],
          }}
          transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div 
            className="absolute"
            style={{
              width: '120px',
              height: '120px',
              top: '-50px',
              left: '50px',
              backgroundColor: isNight ? '#1e293b' : 'white',
              borderRadius: '50%',
            }}
          />
          <div 
            className="absolute"
            style={{
              width: '100px',
              height: '100px',
              top: '-30px',
              left: '150px',
              backgroundColor: isNight ? '#1e293b' : 'white',
              borderRadius: '50%',
            }}
          />
          <div 
            className="absolute"
            style={{
              width: '140px',
              height: '140px',
              top: '-60px',
              left: '130px',
              backgroundColor: isNight ? '#1e293b' : 'white',
              borderRadius: '50%',
            }}
          />
        </motion.div>
      );
    }
    
    return clouds;
  };

  // Generate rain effect
  const generateRain = () => {
    const raindrops = [];
    const raindropCount = 100;

    for (let i = 0; i < raindropCount; i++) {
      const left = Math.random() * 100;
      const delay = Math.random() * 2;
      const duration = Math.random() * 0.5 + 0.7;
      
      raindrops.push(
        <motion.div
          key={i}
          className="absolute bg-blue-400 dark:bg-blue-300"
          style={{
            width: '1px',
            height: '20px',
            left: left + '%',
            top: '-20px',
            opacity: 0.6,
          }}
          animate={{
            y: ['0vh', '100vh'],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: delay,
            ease: 'linear',
          }}
        />
      );
    }

    return raindrops;
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
      {/* Background gradient */}
      <motion.div
        className={`absolute inset-0 w-full h-full ${getBackgroundGradient()}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Sun or Moon */}
      <motion.div
        className={`absolute ${isNight ? 'top-10 right-10' : 'top-20 left-20'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div 
          className={`rounded-full ${
            isNight 
              ? 'bg-gray-200 shadow-[0_0_50px_rgba(255,255,255,0.3)]' 
              : 'bg-yellow-300 shadow-[0_0_100px_rgba(253,224,71,0.8)]'
          } ${isNight ? 'animate-pulse' : 'animate-float'}`}
          style={{
            width: isNight ? '80px' : '120px',
            height: isNight ? '80px' : '120px',
            transform: isNight ? 'rotate(135deg)' : 'none',
            clipPath: isNight ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0)' : 'none',
            opacity: isRaining ? 0.3 : 1
          }}
        />
      </motion.div>
      
      {/* Stars (visible in night mode) */}
      {(isNight || timePeriod === 'dusk') && !isRaining && (
        <>{generateStars()}</>
      )}
      
      {/* Rain */}
      {isRaining && generateRain()}
      
      {/* Clouds */}
      {generateClouds()}
      
      {/* Overlay to adjust contrast with content */}
      <div className={`absolute inset-0 ${
        isNight 
          ? 'bg-gradient-to-t from-black/20 to-transparent' 
          : 'bg-gradient-to-t from-white/10 to-transparent'
      }`}></div>

      {/* Debug overlay */}
      <div className="absolute bottom-0 left-0 bg-black/50 text-white text-xs p-2">
        Time period: {timePeriod}
      </div>
    </div>
  );
};

export default Background;