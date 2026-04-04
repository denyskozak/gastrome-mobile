import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {defaultLanguage} from "../translator/translates";
import {
    IS_FIRST_LAUNCH_EVER_STORE_KEY,
    IS_FIRST_MUSIC_LAUNCH_STORE_KEY,
    SETTINGS_ASYNC_STORE_KEY
} from "../constants/asyncStoreKeys";
import {isFirstLaunch} from "../utilities/isFirstLaunch";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

const defaultValue = {
    version: 1,
    measure: 'g',
    language: defaultLanguage,
    isFirstRunEver: false,
    speechProfile: '',
    speechProfiles: [],
    filterNames: [],
    isDevMode: false,
    errors: [],
    theme: 'midnight',
    muted: true
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
        setSettings((prevSettings) => {
            const next = {...prevSettings, [key]: value};
            AsyncStorage.setItem(SETTINGS_ASYNC_STORE_KEY, JSON.stringify(next)).catch(() => console.error('Error to save settings state in setSetting'));
            return next;
        });
    }, [setSettings])

    const changeSettings = useCallback((nextSettings) => {
        setSettings((prevSettings) => {
            const next = {...prevSettings, ...nextSettings};
            AsyncStorage.setItem(SETTINGS_ASYNC_STORE_KEY, JSON.stringify(next)).catch(() => console.error('Error to save settings state in changeSettings'));
            return next;
        });
    }, [setSettings])

    return [settings, setSetting, changeSettings];
};

// Component
const SettingsComponent = (props) => {
    const {
        children,
        defaultSettings = defaultValue,
    } = props;

    const [settings, setSettings] = useState(defaultSettings === null ? defaultValue : defaultSettings);

    useEffect(() => {
        if (defaultSettings !== null) {
            setSettings(defaultSettings);
        }

        setTimeout(() => {
            isFirstLaunch(IS_FIRST_MUSIC_LAUNCH_STORE_KEY)
                .then(isFirstLaunchEverFlag => {
                    console.log("isFirstLaunchEverFlag", isFirstLaunchEverFlag);
                    if (isFirstLaunchEverFlag) {
                        asyncStorage.setItem(IS_FIRST_MUSIC_LAUNCH_STORE_KEY, 'true')
                            .then(() => { setSettings((prevSettings) => ({...prevSettings, muted: false}))})
                    }

            })

        }, 1000)
    }, [defaultSettings]);

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

export const SettingsContextWrapper = SettingsComponent;
