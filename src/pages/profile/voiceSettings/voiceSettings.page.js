import React, { useMemo } from 'react';
import * as Speech from 'expo-speech';
import { ScrollView, Text, View } from 'react-native';
import { useTranslator } from '../../../hooks/useTranslator';
import { Button } from '../../../components/atomic/button/button.component';

import { useSpeechProfile } from '../../../contexts/speechProfile.context';
import { Animated } from '../../../components/atomic/animated/animated.component';
import styles from './voiceSettings.styles';

const enabledProfiles = [
  'Karen', 'Catherine', 'Daniel', 'Arthur', 'Moira', 'Rishi', 'Nicky', 'Aaron', 'Samantha', 'Tessa'
];
const isProfileEnabled = profile => enabledProfiles.includes(profile.name)

const VoicePageComponent = (props) => {
  const {navigation} = props;

  const [
    t,
  ] = useTranslator('pages.profile');

  const [speechProfile, setSpeechProfile, speechProfiles] = useSpeechProfile();

  const profilesList = useMemo(() => speechProfiles.filter(isProfileEnabled), [speechProfiles]);

  const handleSelectVoice = identifier => {
    Speech.stop()
      .then(() => {
        setSpeechProfile(identifier);
        Speech.speak(t('chooseNewVoice'), {
          onError: (error) => {
            if (error) {
              Speech.stop().then(() => {
              }).catch(() => {
              });
            }
          },
          language: 'en',
          rate: 0.8,
          voice: identifier
        })
      })
      .catch();
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>Choose Assistant voice:</Text>
        <View style={styles.content}>
          {profilesList.map(({name, language, identifier}) => <Button type="outlined" style={styles.assistantButton}
                                                                      selected={speechProfile === identifier}
                                                                      key={`${name} (${language})`}
                                                                      title={name}
                                                                      onPress={() => handleSelectVoice(identifier)}/>)}
        </View>
      </ScrollView>
      <View style={styles.confirmButtonBackground}>
        {speechProfile && (
          <Animated name="BounceInDown">
            <Button
              style={styles.confirmButton}
              textStyle={styles.confirmText}
              type="contained"
              onPress={() => {
                (async () => {
                  await Speech.stop();
                  navigation.goBack();
                })();
              }}
              title={t('confirmText')}
            />
          </Animated>
        )}
      </View>
    </View>
  );
};

export const VoicePage = VoicePageComponent;