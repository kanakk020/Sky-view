import React from 'react';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherDetails from './components/WeatherDetails';
import Background from './components/Background';
import { useTheme } from './contexts/ThemeContext';
import { useWeather } from './contexts/WeatherContext';
import SearchBar from './components/SearchBar';
import { motion } from 'framer-motion';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const { isDarkMode } = useTheme();
  const { weatherData, loading, error } = useWeather();

  return (
    <div className={`min-h-screen relative overflow-x-hidden ${isDarkMode ? 'dark' : ''}`}>
      <Background />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6 flex flex-col gap-6">
          {loading ? (
            <LoadingScreen />
          ) : error ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass p-6 text-center text-red-500 dark:text-red-400 max-w-md mx-auto my-auto"
            >
              <p className="text-lg font-medium">{error}</p>
              <p className="mt-2">Please try again or search for a different location.</p>
              <div className="mt-4 max-w-md mx-auto">
                <SearchBar />
              </div>
            </motion.div>
          ) : weatherData ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <CurrentWeather />
                </div>
                <div>
                  <WeatherDetails />
                </div>
              </div>
              
              <Forecast />
            </>
          ) : (
            <div className="glass p-6 text-center max-w-md mx-auto my-auto">
              <p className="text-lg font-medium text-gray-800 dark:text-white">Welcome to SkyView Weather</p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Search for a location to get started</p>
              <div className="mt-4">
                <SearchBar />
              </div>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;