import React, { useState, useContext, createContext  } from 'react';

export const MenuDarkModeContext = createContext(false);

// Hook
export const useMenuDarkMode = () => {
  const context = useContext(MenuDarkModeContext);

  if (!context) {
    throw new Error('useMenuDarkMode must be used within a MenuDarkModeContext.Provider')
  }

  const { darkMode, setDarkMode } = context;
  return [darkMode, setDarkMode];
};

// Component
const MenuDarkModeComponent = (props) => {
  const {
    children,
  } = props;

  const [darkMode, setDarkMode] = useState(true);

  const value = {
    darkMode,
    setDarkMode
  };

  return (
    <MenuDarkModeContext.Provider value={value}>
      {children}
    </MenuDarkModeContext.Provider>
  );
};

export const MenuDarkModeContextWrapper = MenuDarkModeComponent;
