import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Ionicons';
import type { AVPlaybackStatus } from 'expo-av';
import type { VideoItem } from '../../types/video';
import LinearGradient from 'react-native-linear-gradient';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { getStyles } from './VideoCard.styles';
import { Button } from '../atomic/button/button.component';
import { useTranslator } from '../../hooks/useTranslator';
import { Liner } from '../atomic/video-player/liner/liner.component';
import {AVPlaybackStatusError} from "expo-av/src/AV.types";

let ExpoVideo: any = null;
let ExpoResizeMode: any = null;
let isExpoAvAvailable = false;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const expoAv = require('expo-av');
  ExpoVideo = expoAv.Video;
  ExpoResizeMode = expoAv.ResizeMode;
  isExpoAvAvailable = true;
} catch (error) {
  ExpoVideo = null;
  ExpoResizeMode = null;
  isExpoAvAvailable = false;
}

let RNVideo: any = null;
if (!isExpoAvAvailable) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
    RNVideo = require('react-native-video');
  } catch (error) {
    RNVideo = null;
  }
}

export type VideoPlayerHandle = {
  play: () => Promise<void> | void;
  pause: () => Promise<void> | void;
  unload: () => Promise<void> | void;
  seekToStart: () => Promise<void> | void;
  setMuted: (muted: boolean) => Promise<void> | void;
  prepare: () => Promise<void> | void;
};

export type VideoCardProps = {
  item: VideoItem;
  index: number;
  onVideoLoad?: () => void;
  isActive: boolean;
  onLike?: (item: VideoItem, liked: boolean) => void;
  onToggleMusic?: () => void;
  isMusicEnabled?: boolean;
  onShare?: (item: VideoItem) => void | Promise<void>;
  onPressMeta?: (item: VideoItem) => void;
  onRegister?: (index: number, handle: VideoPlayerHandle | null) => void;
  isFavorite?: boolean;
};

const HEART_ANIMATION_DURATION = 450;
const DOUBLE_TAP_DELAY = 250;

const createAnimatedValue = (initial: number) => new Animated.Value(initial);

const VideoCardComponent: React.FC<VideoCardProps> = ({
                                                        item,
                                                        index,
                                                        isActive,
                                                        onVideoLoad,
                                                        onLike,
                                                        onToggleMusic,
                                                        isMusicEnabled,
                                                        onShare,
                                                        onPressMeta,
                                                        onRegister,
                                                        isFavorite,
                                                      }) => {
  const [tHome] = useTranslator('pages.home');
  const insets = useSafeAreaInsets();
  const videoRef = useRef<any>(null);
  const doubleTapRef = useRef<number>(0);
  const singleTapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressPauseRef = useRef(false);
  const ignoreNextPressRef = useRef(false);
  const preparedRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isBuffering, setIsBuffering] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [liked, setLiked] = useState(Boolean(isFavorite));
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showHeart, setShowHeart] = useState(false);
  const feedbackOpacity = useRef(createAnimatedValue(0)).current;
  const heartScale = useRef(createAnimatedValue(0)).current;
  const tabBarHeight = useBottomTabBarHeight();
  const styles = getStyles(tabBarHeight);

  useEffect(() => {
    setLiked(Boolean(isFavorite));
  }, [isFavorite, item.id]);

  const shouldPlay = isActive && !isManuallyPaused && !hasError;

  const stopSingleTapTimeout = useCallback(() => {
    if (singleTapTimeoutRef.current) {
      clearTimeout(singleTapTimeoutRef.current);
      singleTapTimeoutRef.current = null;
    }
  }, []);

  const showFeedbackMessage = useCallback((message: string) => {
    setFeedback(message);
    feedbackOpacity.stopAnimation();
    feedbackOpacity.setValue(0);
    Animated.sequence([
      Animated.timing(feedbackOpacity, {
        toValue: 1,
        duration: 160,
        useNativeDriver: true,
      }),
      Animated.delay(900),
      Animated.timing(feedbackOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setFeedback(null);
      }
    });
  }, [feedbackOpacity]);

  const animateHeart = useCallback(() => {
    setShowHeart(true);
    heartScale.stopAnimation();
    heartScale.setValue(0);
    Animated.sequence([
      Animated.spring(heartScale, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 0,
        duration: HEART_ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowHeart(false);
    });
  }, [heartScale]);

  const isRecoverablePlaybackError = useCallback((error: unknown) => {
    if (!error) {
      return false;
    }

    if (typeof error === 'string') {
      return (
          /load( is)? in progress/i.test(error) ||
          /not ready/i.test(error) ||
          /invalid view returned from registry/i.test(error)
      );
    }

    if (error instanceof Error) {
      return (
          /load( is)? in progress/i.test(error.message) ||
          /not ready/i.test(error.message) ||
          /invalid view returned from registry/i.test(error.message)
      );
    }

    if (typeof error === 'object') {
      const maybeError = error as { code?: string; message?: string };
      const { code, message } = maybeError;
      if (typeof code === 'string' && (/LOAD_IN_PROGRESS/i.test(code) || /NOTREADY/i.test(code))) {
        return true;
      }
      if (typeof message === 'string') {
        return (
            /load( is)? in progress/i.test(message) ||
            /not ready/i.test(message) ||
            /invalid view returned from registry/i.test(message)
        );
      }
    }

    return false;
  }, []);

  const attemptPlayAfterLoad = useCallback(async () => {
    if (!videoRef.current || !isExpoAvAvailable || !videoRef.current.playAsync) {
      return;
    }

    try {
      pendingPlayRef.current = false;
      await videoRef.current.playAsync();
    } catch (error) {
      if (isRecoverablePlaybackError(error)) {
        pendingPlayRef.current = true;
      } else {
        setHasError(true);
      }
    }
  }, [isRecoverablePlaybackError]);

  const handlePlaybackStatus = useCallback((status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      if ((status as AVPlaybackStatusError).error) {
        setHasError(true);
      }
      return;
    }
    setIsBuffering(status.isBuffering ?? false);
    setIsLoaded(true);
    preparedRef.current = true;

    if (typeof status.durationMillis === 'number') {
      setPlaybackDuration(status.durationMillis);
    }
    if (typeof status.positionMillis === 'number') {
      setPlaybackPosition(status.positionMillis);
    }
    if (status.didJustFinish && typeof status.durationMillis === 'number') {
      setPlaybackPosition(status.durationMillis);
    }

    if (pendingPlayRef.current && shouldPlay && !status.isPlaying) {
      attemptPlayAfterLoad();
    }
  }, [attemptPlayAfterLoad, shouldPlay]);

  const handleProgress = useCallback((event: { currentTime: number; playableDuration: number; seekableDuration: number; }) => {
    if (event.seekableDuration) {
      setPlaybackDuration(event.seekableDuration * 1000);
      setPlaybackPosition(event.currentTime * 1000);
    }
  }, []);

  const ensureMuted = useCallback(async (muted: boolean) => {
    if (isExpoAvAvailable && videoRef.current?.setIsMutedAsync) {
      try {
        await videoRef.current.setIsMutedAsync(muted);
      } catch (error) {
        // ignore mute errors to avoid noisy UI
      }
    }
  }, []);

  const handleDoubleTap = useCallback(() => {
    stopSingleTapTimeout();
    animateHeart();
    if (!liked) {
      setLiked(true);
      onLike?.(item, true);
    }
  }, [animateHeart, item, liked, onLike, stopSingleTapTimeout]);

  const handleSingleTap = useCallback(() => {
    setIsManuallyPaused((prev) => {
      const next = !prev;
      if (isActive && !hasError) {
        showFeedbackMessage(
            next
                ? tHome('paused') ?? 'Paused'
                : tHome('playing') ?? 'Playing',
        );
      }
      return next;
    });
  }, [hasError, isActive, showFeedbackMessage, tHome]);

  const toggleLike = useCallback(() => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    if (nextLiked) {
      animateHeart();
    }
    onLike?.(item, nextLiked);
  }, [animateHeart, item, liked, onLike]);

  const handlePress = useCallback(() => {
    if (ignoreNextPressRef.current) {
      ignoreNextPressRef.current = false;
      doubleTapRef.current = 0;
      stopSingleTapTimeout();
      return;
    }
    const now = Date.now();
    if (doubleTapRef.current && now - doubleTapRef.current < DOUBLE_TAP_DELAY) {
      doubleTapRef.current = 0;
      handleDoubleTap();
    } else {
      doubleTapRef.current = now;
      stopSingleTapTimeout();
      singleTapTimeoutRef.current = setTimeout(() => {
        handleSingleTap();
      }, DOUBLE_TAP_DELAY);
    }
  }, [handleDoubleTap, handleSingleTap, stopSingleTapTimeout]);

  const handleLongPress = useCallback(() => {
    ignoreNextPressRef.current = true;
    longPressPauseRef.current = true;
    stopSingleTapTimeout();
    doubleTapRef.current = 0;
    setIsManuallyPaused((prev) => {
      if (prev || !isActive) {
        return prev;
      }
      showFeedbackMessage(tHome('paused') ?? 'Paused');
      return true;
    });
  }, [isActive, showFeedbackMessage, stopSingleTapTimeout, tHome]);

  const handlePressOut = useCallback(() => {
    if (!longPressPauseRef.current) {
      return;
    }
    longPressPauseRef.current = false;
    setIsManuallyPaused((prev) => {
      if (!prev) {
        return prev;
      }
      if (isActive && !hasError) {
        showFeedbackMessage(tHome('playing') ?? 'Playing');
      }
      return false;
    });
  }, [hasError, isActive, showFeedbackMessage, tHome]);

  const play = useCallback(async () => {
    if (!videoRef.current) return;
    if (isExpoAvAvailable && videoRef.current.playAsync) {
      try {
        const status = await videoRef.current?.getStatusAsync?.();
        if (!status?.isLoaded) {
          pendingPlayRef.current = true;
          await videoRef.current?.loadAsync?.(
              { uri: item.source },
              { shouldPlay: true, isMuted, isLooping: true },
              false,
          );
          pendingPlayRef.current = false;
        } else {
          pendingPlayRef.current = false;
          await videoRef.current?.playAsync();
        }
      } catch (error) {
        console.log("error: ", error)
        if (isRecoverablePlaybackError(error)) {
          pendingPlayRef.current = true;
        } else {
          setHasError(true);
        }
      }
    } else if (videoRef.current?.seek) {
      videoRef.current.seek(0);
    }
  }, [isRecoverablePlaybackError, item.source, isMuted]);

  const pause = useCallback(async () => {
    if (!videoRef.current) return;
    if (isExpoAvAvailable && videoRef.current.pauseAsync) {
      try {
        await videoRef.current.pauseAsync();
      } catch (error) {
        // ignore
      }
    }
  }, []);

  const seekToStart = useCallback(async () => {
    if (!videoRef.current) return;
    if (isExpoAvAvailable && videoRef.current.setStatusAsync) {
      try {
        await videoRef.current.setStatusAsync({
          positionMillis: 0,
          shouldPlay: false,
          isLooping: true,
        });
      } catch (error) {
        // ignore
      }
    } else if (videoRef.current.seek) {
      videoRef.current.seek(0);
    }
  }, []);

  const unload = useCallback(async () => {
    if (!videoRef.current) return;
    if (isExpoAvAvailable && videoRef.current.unloadAsync) {
      try {
        await videoRef.current.unloadAsync();
      } catch (error) {
        // ignore
      }
      preparedRef.current = false;
    } else if (videoRef.current.seek) {
      videoRef.current.seek(0);
    }
    setIsLoaded(false);
    setPlaybackPosition(0);
    setPlaybackDuration(0);
    pendingPlayRef.current = false;
  }, []);

  const prepare = useCallback(async () => {
    if (!videoRef.current) return;
    if (preparedRef.current) {
      return;
    }
    if (isExpoAvAvailable && videoRef.current.getStatusAsync) {
      try {
        const status = await videoRef.current.getStatusAsync();
        if (!status?.isLoaded) {
          await videoRef.current.loadAsync?.(
              { uri: item.source },
              { shouldPlay: false, isMuted: true, isLooping: true },
              false,
          );
        }
        preparedRef.current = true;
      } catch (error) {
        // ignore load errors during prefetch
      }
    } else {
      preparedRef.current = true;
    }
  }, [item.source]);

  useEffect(() => {
    onRegister?.(index, {
      play,
      pause,
      unload,
      seekToStart,
      setMuted: async (muted: boolean) => {
        setIsMuted(muted);
        await ensureMuted(muted);
      },
      prepare,
    });
    return () => {
      stopSingleTapTimeout();
      onRegister?.(index, null);
    };
  }, [ensureMuted, index, onRegister, pause, play, prepare, seekToStart, stopSingleTapTimeout, unload]);

  useEffect(() => {
    ensureMuted(isMuted);
  }, [ensureMuted, isMuted]);

  useEffect(() => {
    if (!videoRef.current) return;

    if (shouldPlay) {
      play();
    } else {
      pause();
      if (!isActive) {
        seekToStart();
      }
    }
  }, [isActive, isLoaded, pause, play, seekToStart, shouldPlay]);

  useEffect(() => {
    if (!isActive && isManuallyPaused) {
      setIsManuallyPaused(false);
    }
  }, [isActive, isManuallyPaused]);

  useEffect(() => {
    if (hasError) {
      showFeedbackMessage(tHome('videoUnavailable') ?? 'Video unavailable');
    }
  }, [hasError, showFeedbackMessage, tHome]);

  useEffect(() => () => {
    unload();
  }, [unload]);

  const handleLoadStart = useCallback(() => {
    setIsBuffering(true);
    setHasError(false);
  }, []);

  const handleLoad = useCallback(() => {
    setIsBuffering(false);
    setIsLoaded(true);

    preparedRef.current = true;

    if (pendingPlayRef.current && shouldPlay) {
      attemptPlayAfterLoad();
    }

    setTimeout(() => {
      onVideoLoad?.();
    });
  }, [attemptPlayAfterLoad, shouldPlay]);

  const handleVideoError = useCallback(
      (error: unknown) => {
        const resolvedError =
            typeof error === 'object' && error !== null
                ? 'nativeEvent' in (error as Record<string, unknown>)
                    ? (error as { nativeEvent: unknown }).nativeEvent
                    : 'error' in (error as Record<string, unknown>)
                        ? (error as { error: unknown }).error
                        : error
                : error;

        if (isRecoverablePlaybackError(resolvedError)) {
          pendingPlayRef.current = true;
          setIsBuffering(true);
          return;
        }

        setHasError(true);
        setIsBuffering(false);
      },
      [isRecoverablePlaybackError],
  );

  const renderVideo = () => {
    if (isExpoAvAvailable && ExpoVideo) {
      return (
          <ExpoVideo
              ref={videoRef}
              style={StyleSheet.absoluteFill}
              source={{ uri: item.source }}
              resizeMode={ExpoResizeMode?.CONTAIN ?? 'contain'}
              isLooping
              isMuted={isMuted}
              onLoadStart={handleLoadStart}
              onLoad={handleLoad}
              onError={handleVideoError}
              onPlaybackStatusUpdate={handlePlaybackStatus}
              useNativeControls={false}
              posterSource={item.poster ? { uri: item.poster } : undefined}
              posterStyle={styles.poster}
          />
      );
    }

    if (RNVideo) {
      return (
          <RNVideo
              ref={videoRef}
              source={{ uri: item.source }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
              repeat
              muted={isMuted}
              paused={!shouldPlay}
              onLoadStart={handleLoadStart}
              onLoad={handleLoad}
              onError={handleVideoError}
              onBuffer={({ isBuffering: buffering }: { isBuffering: boolean }) => setIsBuffering(buffering)}
              onProgress={handleProgress}
              onEnd={() => setPlaybackPosition(playbackDuration)}
          />
      );
    }

    return null;
  };

  const heartStyle = useMemo(
      () => [
        styles.heart,
        {
          transform: [
            {
              scale: heartScale.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
        },
      ],
      [heartScale],
  );

  return (
      <View style={styles.container}>
        <View style={styles.videoContainer}>
          {item.poster && !isLoaded ? (
              // @ts-ignore
              <Image source={{ uri: item.poster }} style={styles.poster} resizeMode="cover" />
          ) : null}
          {renderVideo()}
          {isBuffering && !isLoaded ? (
              <View style={styles.bufferingOverlay}>
                <ActivityIndicator color="#fff" size="large" />
              </View>
          ) : null}
          {hasError ? (
              <View style={styles.errorOverlay}>
                <Text style={styles.errorText}>
                  {tHome('videoUnavailable') ?? 'Video unavailable'}
                </Text>
              </View>
          ) : null}
          {showHeart ? (
              <Animated.View pointerEvents="none" style={heartStyle}>
                <Icon name="heart" size={72} color="#ff4d6d" />
              </Animated.View>
          ) : null}
          <Pressable
              style={StyleSheet.absoluteFill}
              onPress={handlePress}
              onLongPress={handleLongPress}
              delayLongPress={250}
              onPressOut={handlePressOut}
          >
            <View style={StyleSheet.absoluteFill} />
          </Pressable>
          {feedback ? (
              <Animated.View style={[styles.feedbackContainer, { opacity: feedbackOpacity }]}>
                <Text style={styles.feedbackText}>{feedback}</Text>
              </Animated.View>
          ) : null}
        </View>

        <View
            style={[
              styles.overlay,
              { paddingBottom: insets.bottom + 24 + tabBarHeight * 0.5 },
            ]}
        >
          <LinearGradient
              pointerEvents="none"
              colors={['rgba(0,0,0,0.85)', 'rgba(0,0,0,0)']}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
              style={styles.overlayGradient}
          />
          <TouchableOpacity
              activeOpacity={0.8}
              style={styles.metaContainer}
              onPress={() => onPressMeta?.(item)}
          >
            <View style={styles.authorRow}>
              {/*<Image source={{ uri: item.author.avatar }} style={styles.avatar} />*/}
              <View style={styles.metaText}>
                <Text style={styles.authorName}>{item.author.name}</Text>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </View>
            {/*{item.description ? (*/}
            {/*  <Text style={styles.description}>*/}
            {/*    {item?.description?.slice(0, 64)}*/}
            {/*    {item?.description.length > 16 ? '...' : ''}*/}
            {/*  </Text>*/}
            {/*) : null}*/}
            <Button
                type="contained"
                size="xxl"
                title={tHome('openRecipeButton')}
                onPress={() => onPressMeta?.(item)}
                style={styles.metaButton}
                textStyle={styles.metaButtonText}
            />
          </TouchableOpacity>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
                onPress={toggleLike}
                style={styles.actionButton}
                accessibilityLabel={tHome('likeAccessibilityLabel') ?? 'Like video'}
                accessible
            >
              <View style={styles.actionIcon}>
                <Icon
                    name={liked ? 'heart' : 'heart-outline'}
                    size={28}
                    color={liked ? '#ff4d6d' : '#ffffff'}
                />
              </View>
              <Text style={styles.actionLabel}>{tHome('likeActionLabel') ?? 'Like'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onToggleMusic}
                style={styles.actionButton}
                accessibilityLabel={
                  isMusicEnabled
                      ? tHome('stopBackgroundMusic') ?? 'Stop background music'
                      : tHome('startBackgroundMusic') ?? 'Play background music'
                }
                accessible
            >
              <View style={styles.actionIcon}>
                <Icon name="musical-notes" size={28} color="#ffffff" />
                {!isMusicEnabled ? <View style={styles.musicOffSlash} /> : null}
              </View>
              <Text style={styles.actionLabel}>{tHome('musicActionLabel') ?? 'Music'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onShare?.(item)}
                style={styles.actionButton}
                accessibilityLabel={tHome('shareAccessibilityLabel') ?? 'Share video'}
                accessible
            >
              <View style={styles.actionIcon}>
                <Icon name="share-social-outline" size={28} color="#ffffff" />
              </View>
              <Text style={styles.actionLabel}>{tHome('shareActionLabel') ?? 'Share'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.progressContainer}>
          {playbackDuration > 0 ? (
              <Liner
                  style={styles.progressLine}
                  positionMillis={playbackPosition}
                  durationMillis={playbackDuration}
              />
          ) : null}
        </View>
      </View>
  );
};

export const VideoCard = memo(VideoCardComponent);
