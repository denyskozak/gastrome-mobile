import React, { useState, useContext, createContext  } from 'react';
import PropsType from 'prop-types';

export const SpeechProfileContext = createContext(false);

// Hook
export const useSpeechProfile = () => {
  const context = useContext(SpeechProfileContext);

  if (!context) {
    throw new Error('useSpeechProfile must be used within a SpeechProfileContext.Provider')
  }

  const { selectedSpeechProfile , setSelectedSpeechProfile, speechProfiles, setSpeechProfiles } = context;
  return [selectedSpeechProfile, setSelectedSpeechProfile, speechProfiles, setSpeechProfiles];
};

// Component
const SpeechProfileComponent = (props) => {
  const {
    children,
  } = props;

  const [speechProfiles, setSpeechProfiles] = useState();
  const [selectedSpeechProfile, setSelectedSpeechProfile] = useState();

  const value = {
    speechProfiles,
    setSpeechProfiles,
    selectedSpeechProfile,
    setSelectedSpeechProfile
  };

  return (
    <SpeechProfileContext.Provider value={value}>
      {children}
    </SpeechProfileContext.Provider>
  );
};

SpeechProfileComponent.propTypes = {
  children: PropsType.object.isRequired,
};

export const SpeechProfileContextWrapper = SpeechProfileComponent;