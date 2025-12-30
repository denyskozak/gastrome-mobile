import React, {useState, useContext, createContext, useCallback, useEffect} from 'react';

const defaultValue = true;

// const storedConfig = await AsyncStorage.getItem(SETTINGS_ASYNC_STORE_KEY);
// const defaultConfig = storedConfig ? JSON.parse(storedConfig) : {...defaultValue};

export const SplashScreenContext = createContext(defaultValue);

// Hook
export const useSplashScreen = () => {
  const context = useContext(SplashScreenContext);

  if (!context) {
    throw new Error('useSplashScreen must be used within a SplashScreenContext.Provider')
  }

  const {value, setValue} = context;


  return [value, setValue];
};

// Component
const SplashScreenComponent = (props) => {
  const {
    children,
  } = props;

  const [value, setValue] = useState(defaultValue);

  return (
    <SplashScreenContext.Provider value={{
      value,
      setValue
    }}>
      {children}
    </SplashScreenContext.Provider>
  );
};

export const SplashScreenContextWrapper = SplashScreenComponent;
