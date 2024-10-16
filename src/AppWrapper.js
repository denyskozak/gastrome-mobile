import React, { useEffect } from 'react';
import { Navigation } from './navigation/navigation';

import { useSpeechProfile } from './contexts/speechProfile.context';
import * as Speech from 'expo-speech';

export const AppWrapper = () => {
  const [, , , setSpeechProfiles] = useSpeechProfile();

  useEffect(() => {
    (async () => {
      // Getting speech profiles
      try {
        const profiles = await Speech.getAvailableVoicesAsync()
        const filteredProfiles = profiles.filter(item => item.language.includes('en-'));
        setSpeechProfiles(filteredProfiles);
      } catch (e) {
        console.log('Error speech profile loading');
      }
    })()
  }, []);

  return (
    <Navigation/>
  );
};
