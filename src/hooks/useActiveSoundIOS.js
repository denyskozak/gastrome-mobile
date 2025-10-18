import { Platform } from 'react-native';
import { Audio } from 'expo-av';
import { useEffect } from 'react';
import { VolumeManager } from 'react-native-volume-manager';

const soundObject = new Audio.Sound();

const muteSong = require('./MuteChecker.caf');

let isLoaded = false;
export const useActivateSoundIOS = () => {
  useEffect(() => {

    try {
      (async () => {
        if (Platform.OS === 'ios') {
          await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
          });
          if (isLoaded === false) {
            await soundObject.loadAsync(muteSong);
            isLoaded = true;
          }
          await soundObject.playAsync();
        }
      })()
    } catch (e) {
      console.log(e);
    }
  }, []);
}