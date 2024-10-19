import {useLayoutEffect} from 'react';

import {useSpeechProfile} from './hooks/useSpeechProfile.js';
import * as Speech from 'expo-speech';
import {useTranslator} from "./hooks/useTranslator";
import PropTypes from "prop-types";
import {getSpeechProfiles, preferableProfileByLanguages} from "./utilities/speechProfiles.js";
import {useSettings} from "./contexts/settings.context.js";


const LayoutComponent = ({children}) => {
    const [,, setSettings] = useSettings();
    const [, , language] = useTranslator();

    useLayoutEffect(() => {
        (async () => {
            // Getting speech profiles
            try {
                const profiles = await getSpeechProfiles(language)
                const preferableIndex = profiles.findIndex(item => item.name === preferableProfileByLanguages[language]); // first looking by name and lang
                const possibleIndex = preferableIndex > -1 ? preferableIndex : Array.isArray(profiles) && profiles.length > 0 ? 0 : null; // second for 1 profile or null
                const possibleProfile = typeof possibleIndex === 'number' ? profiles[possibleIndex]['identifier'] : '';
                setSettings({speechProfile: possibleProfile, speechProfiles: profiles})
            } catch (e) {
                console.log('Error speech profile loading');
            }
        })()
    }, [language]);

    return children;
};

LayoutComponent.propTypes = {
    children: PropTypes.node.isRequired,
}

export const Layout = LayoutComponent;
