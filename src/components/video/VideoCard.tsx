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
  isActive: boolean;
  onToggleMute?: (index: number, muted: boolean) => void;
  onLike?: (item: VideoItem) => void;
  onComment?: (item: VideoItem) => void;
  onShare?: (item: VideoItem) => void;
  onRegister?: (index: number, handle: VideoPlayerHandle | null) => void;
};

const HEART_ANIMATION_DURATION = 450;
const DOUBLE_TAP_DELAY = 250;

const createAnimatedValue = (initial: number) => new Animated.Value(initial);

const VideoCardComponent: React.FC<VideoCardProps> = ({
  item,
  index,
  isActive,
  onToggleMute,
  onLike,
  onComment,
  onShare,
  onRegister,
}) => {
  const insets = useSafeAreaInsets();
  const videoRef = useRef<any>(null);
  const doubleTapRef = useRef<number>(0);
  const singleTapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const preparedRef = useRef(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isBuffering, setIsBuffering] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [liked, setLiked] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showHeart, setShowHeart] = useState(false);
  const feedbackOpacity = useRef(createAnimatedValue(0)).current;
  const heartScale = useRef(createAnimatedValue(0)).current;

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

  const handlePlaybackStatus = useCallback((status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      if (status.error) {
        setHasError(true);
      }
      return;
    }
    setIsBuffering(status.isBuffering ?? false);
    setIsLoaded(true);
    preparedRef.current = true;

    if (status.durationMillis) {
      const currentProgress = status.positionMillis / status.durationMillis;
      setProgress(currentProgress);
    }
    if (status.didJustFinish) {
      setProgress(1);
    }
  }, []);

  const handleProgress = useCallback((event: { currentTime: number; playableDuration: number; seekableDuration: number; }) => {
    if (event.seekableDuration) {
      setProgress(Math.min(event.currentTime / event.seekableDuration, 1));
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

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      onToggleMute?.(index, next);
      showFeedbackMessage(next ? 'Звук выключен' : 'Звук включен');
      return next;
    });
  }, [index, onToggleMute, showFeedbackMessage]);

  const handleLike = useCallback(() => {
    setLiked(true);
    onLike?.(item);
    animateHeart();
  }, [animateHeart, item, onLike]);

  const handleDoubleTap = useCallback(() => {
    stopSingleTapTimeout();
    handleLike();
  }, [handleLike, stopSingleTapTimeout]);

  const handleSingleTap = useCallback(() => {
    toggleMute();
  }, [toggleMute]);

  const handlePress = useCallback(() => {
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
    setIsManuallyPaused((prev) => {
      const next = !prev;
      if (!next && !isActive) {
        return prev;
      }
      showFeedbackMessage(next ? 'Пауза' : 'Воспроизведение');
      return next;
    });
  }, [isActive, showFeedbackMessage]);

  const play = useCallback(async () => {
    if (!videoRef.current) return;
    if (isExpoAvAvailable && videoRef.current.playAsync) {
      try {
        const status = await videoRef.current.getStatusAsync?.();
        if (!status?.isLoaded) {
          await videoRef.current.loadAsync?.(
            { uri: item.source },
            { shouldPlay: true, isMuted },
            false,
          );
        } else {
          await videoRef.current.playAsync();
        }
      } catch (error) {
        setHasError(true);
      }
    } else if (videoRef.current?.seek) {
      videoRef.current.seek(0);
    }
  }, [item.source, isMuted]);

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
        await videoRef.current.setStatusAsync({ positionMillis: 0, shouldPlay: false });
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
    setProgress(0);
    setIsLoaded(false);
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
            { shouldPlay: false, isMuted: true },
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
  }, [isActive, pause, play, seekToStart, shouldPlay]);

  useEffect(() => {
    if (!isActive && isManuallyPaused) {
      setIsManuallyPaused(false);
    }
  }, [isActive, isManuallyPaused]);

  useEffect(() => {
    if (hasError) {
      showFeedbackMessage('Видео недоступно');
    }
  }, [hasError, showFeedbackMessage]);

  useEffect(() => () => {
    unload();
  }, [unload]);

  const renderVideo = () => {
    if (isExpoAvAvailable && ExpoVideo) {
      return (
        <ExpoVideo
          ref={videoRef}
          style={StyleSheet.absoluteFill}
          source={{ uri: item.source }}
          resizeMode={ExpoResizeMode?.COVER ?? 'cover'}
          shouldPlay={shouldPlay}
          isLooping
          isMuted={isMuted}
          onLoadStart={() => {
            setIsBuffering(true);
            setHasError(false);
          }}
          onLoad={() => {
            setIsBuffering(false);
            setIsLoaded(true);
            preparedRef.current = true;
          }}
          onError={() => {
            setHasError(true);
            setIsBuffering(false);
          }}
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
          onLoadStart={() => {
            setIsBuffering(true);
            setHasError(false);
          }}
          onLoad={() => {
            setIsBuffering(false);
            setIsLoaded(true);
          }}
          onError={() => {
            setHasError(true);
            setIsBuffering(false);
          }}
          onBuffer={({ isBuffering: buffering }: { isBuffering: boolean }) => setIsBuffering(buffering)}
          onProgress={handleProgress}
          onEnd={() => setProgress(1)}
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
          <Image source={{ uri: item.poster }} style={styles.poster} resizeMode="cover" />
        ) : null}
        {renderVideo()}
        {isBuffering ? (
          <View style={styles.bufferingOverlay}>
            <ActivityIndicator color="#fff" size="large" />
          </View>
        ) : null}
        {hasError ? (
          <View style={styles.errorOverlay}>
            <Text style={styles.errorText}>Видео недоступно</Text>
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
        >
          <View style={StyleSheet.absoluteFill} />
        </Pressable>
        {feedback ? (
          <Animated.View style={[styles.feedbackContainer, { opacity: feedbackOpacity }]}> 
            <Text style={styles.feedbackText}>{feedback}</Text>
          </Animated.View>
        ) : null}
      </View>

      <View style={[styles.overlay, { paddingBottom: insets.bottom + 24 }]}> 
        <View style={styles.metaContainer}>
          <View style={styles.authorRow}>
            <Image source={{ uri: item.author.avatar }} style={styles.avatar} />
            <View style={styles.metaText}>
              <Text style={styles.authorName}>{item.author.name}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </View>
          {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
          {item.tags?.length ? (
            <Text style={styles.tags}>{item.tags.join(' ')}</Text>
          ) : null}
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={() => {
              setLiked((prev) => !prev);
              if (!liked) {
                handleLike();
              }
            }}
            style={styles.actionButton}
            accessibilityLabel="Поставить лайк"
            accessible
          >
            <Icon name={liked ? 'heart' : 'heart-outline'} size={28} color={liked ? '#ff4d6d' : '#ffffff'} />
            <Text style={styles.actionLabel}>Лайк</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onComment?.(item)}
            style={styles.actionButton}
            accessibilityLabel="Открыть комментарии"
            accessible
          >
            <Icon name="chatbubble-ellipses-outline" size={28} color="#ffffff" />
            <Text style={styles.actionLabel}>Коммент.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onShare?.(item)}
            style={styles.actionButton}
            accessibilityLabel="Поделиться видео"
            accessible
          >
            <Icon name="share-social-outline" size={28} color="#ffffff" />
            <Text style={styles.actionLabel}>Поделиться</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${Math.min(progress * 100, 100)}%` }]} />
      </View>
    </View>
  );
};

export const VideoCard = memo(VideoCardComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  bufferingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 24,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  metaContainer: {
    flex: 1,
    marginRight: 16,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  metaText: {
    flexShrink: 1,
  },
  authorName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  description: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 6,
  },
  tags: {
    color: '#d1d1d1',
    fontSize: 13,
  },
  actionsContainer: {
    width: 84,
    alignItems: 'center',
    paddingBottom: 12,
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 18,
  },
  actionLabel: {
    color: '#fff',
    marginTop: 4,
    fontSize: 12,
  },
  progressContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ff4d6d',
  },
  heart: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -36,
    marginTop: -36,
  },
  feedbackContainer: {
    position: 'absolute',
    top: '20%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  feedbackText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
