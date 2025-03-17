import React, {useState, useContext, createContext, useCallback, useLayoutEffect} from 'react';
import PropsType from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import {defaultLanguage} from "../translator/translates";
import {SETTINGS_ASYNC_STORE_KEY} from "../constants/asyncStoreKeys";

const defaultValue = {
  measure: 'g',
  language: defaultLanguage,
  isFirstRunEver: false,
  speechProfile: '',
  speechProfiles: [],
  filterNames: [],
  isDevMode: false,
  errors: []
};

// const storedConfig = await AsyncStorage.getItem(SETTINGS_ASYNC_STORE_KEY);
// const defaultConfig = storedConfig ? JSON.parse(storedConfig) : {...defaultValue};

export const SettingsContext = createContext({...defaultValue});

// Hook
export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within a SettingsContext.Provider')
  }

  const {settings, setSettings} = context;

  /**
   * Send a request.
   * @param {string} key - One of setting
   * @param {string|number} value - Value of key setting
   */
  const setSetting = useCallback((key, value) => {
    console.log('settings ', settings)
    const newSettings = {...settings, [key]: value};
    AsyncStorage.setItem(SETTINGS_ASYNC_STORE_KEY, JSON.stringify(newSettings));
    setSettings(newSettings);
  }, [settings, setSettings])

  const changeSettings = useCallback((nextSettings) => {
    const newSettings = {...settings, ...nextSettings};
    AsyncStorage.setItem(SETTINGS_ASYNC_STORE_KEY, JSON.stringify(newSettings));
    setSettings(newSettings);
  }, [settings, setSettings])

  return [settings, setSetting, changeSettings];
};

// Component
const SettingsComponent = (props) => {
  const {
    children,
    defaultSettings = defaultValue,
  } = props;

  const [settings, setSettings] = useState(defaultSettings === null ? defaultValue : defaultSettings);

  const value = {
    settings,
    setSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsComponent.propTypes = {
  children: PropsType.object.isRequired,
};

export const SettingsContextWrapper = SettingsComponent;