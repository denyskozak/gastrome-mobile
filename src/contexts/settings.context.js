import React, { useState, useContext, createContext, useCallback, useEffect } from 'react';
import PropsType from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import {defaultLanguage} from "../translator/translates";

const defaultValue = {
  measure: 'g',
  language: defaultLanguage,
  isFirstRunEver: false,
  speechProfile: '',
  speechProfiles: [],
  isDevMode: false,
  errors: []
};

export const SettingsContext = createContext({...defaultValue});

const SETTINGS_ASYNC_STORE_KEY = 'SETTINGS_ASYNC_STORE_KEY313';

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
    const newSettings = {...settings, [key]: value};
    setSettings(newSettings);
    AsyncStorage.setItem(SETTINGS_ASYNC_STORE_KEY, JSON.stringify(newSettings));
  }, [settings, setSettings])

  const changeSettings = useCallback((nextSettings) => {
    const newSettings = {...settings, ...nextSettings};
    setSettings(newSettings);
    AsyncStorage.setItem(SETTINGS_ASYNC_STORE_KEY, JSON.stringify(newSettings));
  }, [settings, setSettings])

  return [settings, setSetting, changeSettings];
};

// Component
const SettingsComponent = (props) => {
  const {
    children,
  } = props;

  const [settings, setSettings] = useState({...defaultValue});

  useEffect(() => {
    try {
      (async () => {
        const items = await AsyncStorage.getItem(SETTINGS_ASYNC_STORE_KEY);
        if (items) {
          // setSettings(JSON.parse(items));
        }
      })()
    } catch (e) {
      console.log('Settings restore failed');
    }
  }, []);

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