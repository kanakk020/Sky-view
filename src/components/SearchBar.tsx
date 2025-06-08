import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';
import { motion } from 'framer-motion';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { fetchWeather } = useWeather();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await fetchWeather(query);
      setQuery('');
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a city..."
        className="w-full px-4 py-2 pr-10 rounded-full bg-white/70 dark:bg-gray-700/50 
                   backdrop-blur-sm border border-gray-200 dark:border-gray-600 
                   text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                   transition-all duration-300"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 h-full px-3 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        <Search size={20} />
      </button>
    </motion.form>
  );
};

export default SearchBar;