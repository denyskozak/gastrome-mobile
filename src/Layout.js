import { useEffect } from 'react';

import { useSpeechProfile } from './hooks/useSpeechProfile.js';
import * as Speech from 'expo-speech';
import {useTranslator} from "./hooks/useTranslator";
import PropTypes from "prop-types";

const LayoutComponent = ({ isFirstRunEver, children }) => {
  const [, setSpeechProfile , setSpeechProfiles] = useSpeechProfile();
  const [, , language] = useTranslator();

  useEffect(() => {
    (async () => {
      // Getting speech profiles
      try {
        const profiles = await Speech.getAvailableVoicesAsync()
        const filteredProfiles = profiles.filter(item => item.language.includes(`${language}-`));
        if (Array.isArray(filteredProfiles) && filteredProfiles[0]) { // Set first speech profile per languiage
          setSpeechProfile(filteredProfiles[0]);
        }
        setSpeechProfiles(filteredProfiles);
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
