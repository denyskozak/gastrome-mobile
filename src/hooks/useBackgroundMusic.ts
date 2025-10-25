import { useCallback, useEffect, useRef, useState } from 'react';
import { Audio, AVPlaybackStatusSuccess } from 'expo-av';

export type BackgroundMusicSource = Parameters<typeof Audio.Sound.createAsync>[0];

export type UseBackgroundMusicOptions = {
  volume?: number;
  staysActiveInBackground?: boolean;
};

type BackgroundMusicControls = {
  start: () => Promise<void>;
  stop: () => Promise<void>;
  isPlaying: boolean;
};

export const useBackgroundMusic = (
  source: BackgroundMusicSource,
  { volume = 0.4, staysActiveInBackground = true }: UseBackgroundMusicOptions = {},
): BackgroundMusicControls => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const configureAudioMode = useCallback(async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground,
        playsInSilentModeIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.warn('useBackgroundMusic: failed to set audio mode', error);
    }
  }, [staysActiveInBackground]);

  const ensureSound = useCallback(async () => {
    if (soundRef.current) {
      return soundRef.current;
    }

    const { sound } = await Audio.Sound.createAsync(
      source,
      { volume, isLooping: true },
    );

    soundRef.current = sound;
    return sound;
  }, [source, volume]);

  const start = useCallback(async () => {
    try {
      const sound = await ensureSound();
      await configureAudioMode();
      const status = (await sound.getStatusAsync()) as AVPlaybackStatusSuccess | undefined;

      if (status?.isLoaded) {
        if (!status.isLooping) {
          await sound.setIsLoopingAsync(true);
        }
        const shouldRandomizeStart = !status.isPlaying;
        if (
          shouldRandomizeStart &&
          typeof status.durationMillis === 'number' &&
          status.durationMillis > 0
        ) {
          const randomPosition = Math.floor(Math.random() * status.durationMillis);
          await sound.setPositionAsync(randomPosition);
        }
        if (!status.isPlaying) {
          await sound.playAsync();
        }
      } else {
        await sound.playAsync();
      }
      setIsPlaying(true);
    } catch (error) {
      console.warn('useBackgroundMusic: failed to start playback', error);
    }
  }, [configureAudioMode, ensureSound]);

  const stop = useCallback(async () => {
    try {
      const sound = soundRef.current;
      if (!sound) {
        return;
      }

      const status = await sound.getStatusAsync();
      if (status && 'isLoaded' in status && status.isLoaded) {
        await sound.stopAsync();
        await sound.setPositionAsync(0);
      }
      setIsPlaying(false);
    } catch (error) {
      console.warn('useBackgroundMusic: failed to stop playback', error);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch((error) => {
          console.warn('useBackgroundMusic: failed to unload sound', error);
        });
        soundRef.current = null;
      }
    };
  }, []);

  return {
    start,
    stop,
    isPlaying,
  };
};
