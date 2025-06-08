import React from 'react';
import { motion } from 'framer-motion';
import { CloudSun } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        className="mb-6"
      >
        <CloudSun size={64} className="text-primary-500 dark:text-primary-400" />
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xl font-medium text-gray-800 dark:text-white"
      >
        Loading weather data...
      </motion.h2>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="h-1 bg-primary-500 dark:bg-primary-400 rounded-full mt-4 max-w-xs"
      />
    </div>
  );
};

export default LoadingScreen;