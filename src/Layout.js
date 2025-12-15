import {useLayoutEffect} from 'react';

import {useSpeechProfile} from './hooks/useSpeechProfile.js';
import * as Speech from 'expo-speech';
import {useTranslator} from "./hooks/useTranslator";
import PropTypes from "prop-types";
import {getSpeechProfiles, preferableProfileByLanguages} from "./utilities/speechProfiles.js";
import {useSettings} from "./contexts/settings.context.js";
import {SETTINGS_ASYNC_STORE_KEY} from "./constants/asyncStoreKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {defaultLanguage} from "./translator/translates";

let isFirstRun = true;
const LayoutComponent = ({children}) => {
    const [settings, , setSettings] = useSettings();
    const [, , language] = useTranslator();

    useLayoutEffect(() => {
        (async () => {
            // Getting speech profiles and default config
            try {
                if (
                    (settings['speechProfile'] && !isFirstRun) // if not first run and has profile (for language change)
                    || (settings['speechProfile'] === '' && isFirstRun) // if first run and has no profile (for first run)
                ) {
                    const profiles = await getSpeechProfiles(language)
                    const preferableIndex = profiles.findIndex(item => item.name === preferableProfileByLanguages[language]); // first looking by name and lang
                    const possibleIndex = preferableIndex > -1 ? preferableIndex : Array.isArray(profiles) && profiles.length > 0 ? 0 : null; // second for 1 profile or null
                    const possibleProfile = typeof possibleIndex === 'number' ? profiles[possibleIndex]['identifier'] : '';

                    setSettings({speechProfile: possibleProfile, speechProfiles: profiles})
                }

                isFirstRun = false;
            } catch (e) {
                console.log('Error speech profile loading', e);
            }
        })()
    }, [language]);

    return children;
};

LayoutComponent.propTypes = {
    children: PropTypes.node.isRequired,
}

export const Layout = LayoutComponent;
