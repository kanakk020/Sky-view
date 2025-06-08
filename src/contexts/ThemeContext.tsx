import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Check if it's dark mode time (after sunset or before sunrise)
  const isDarkModeTime = (): boolean => {
    const hour = new Date().getHours();
    return hour >= 19 || hour < 5; // Dark mode from 7 PM to 5 AM
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(isDarkModeTime());

  // Update theme based on time
  useEffect(() => {
    const updateThemeBasedOnTime = () => {
      setIsDarkMode(isDarkModeTime());
    };

    // Update theme immediately and then every minute
    updateThemeBasedOnTime();
    const interval = setInterval(updateThemeBasedOnTime, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};