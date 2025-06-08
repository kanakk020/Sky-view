import React from 'react';
import { MapPin, Menu, X } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';

const Header = () => {
  const { location } = useWeather();
  const { isDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-20 glass backdrop-blur-md bg-white/10 dark:bg-black/10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <motion.h1 
            className="text-2xl font-bold text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            SkyView
          </motion.h1>
          <div className="hidden md:flex items-center ml-4">
            <MapPin size={18} className="text-gray-600 dark:text-gray-300" />
            <span className="ml-1 text-gray-600 dark:text-gray-300">
              {location.name}
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center">
          <div className="w-64">
            <SearchBar />
          </div>
        </div>

        <button 
          className="md:hidden text-gray-800 dark:text-white"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden px-4 py-4 border-t border-gray-200 dark:border-gray-700 bg-white/10 dark:bg-black/10 backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center mb-4">
            <MapPin size={18} className="text-gray-600 dark:text-gray-300" />
            <span className="ml-1 text-gray-600 dark:text-gray-300">
              {location.name}
            </span>
          </div>
          <SearchBar />
        </motion.div>
      )}
    </header>
  );
};

export default Header;