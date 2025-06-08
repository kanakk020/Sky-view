import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto py-4 px-4 glass backdrop-blur-md bg-white/5 dark:bg-black/5">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-sm">
        <div className="text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
          © {new Date().getFullYear()} SkyView Weather. All rights reserved.
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 dark:text-gray-400 flex items-center">
            Made with <Heart size={14} className="mx-1 text-red-500" /> in React
          </span>
          
          <a 
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;