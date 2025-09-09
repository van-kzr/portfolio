import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';

import { useLocation } from 'react-router-dom';

type ThemeContextType = {
  color: string;
  changeColor: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const [color, setColor] = useState<string>('#008CFF');

  const colors = useMemo(() => ['#008CFF', '#FF5733', '#4CAF50'], []);

  const getRandomColor = useCallback(
    (currentColor: string) => {
      let newColor = currentColor;
      while (newColor === currentColor) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        newColor = colors[randomIndex];
      }
      return newColor;
    },
    [colors]
  );

  const changeColor = useCallback(() => {
    setColor(prev => getRandomColor(prev));
  }, [getRandomColor]);

  useEffect(() => {
    changeColor();
  }, [location.pathname, changeColor]);

  return (
    <ThemeContext.Provider value={{ color, changeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
