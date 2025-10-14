import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { VideoCard, VideoPlayerHandle } from '../../components/video/VideoCard';
import { mockVideos } from '../../data/mockVideos';
import type { VideoItem } from '../../types/video';
import { useActiveItem } from '../../hooks/useActiveItem';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_BUFFER_DISTANCE = 2;
const INITIAL_RENDER = 3;

const createUniqueId = (video: VideoItem, suffix: string, index: number) => `${video.id}-${suffix}-${index}`;

const withUniqueId = (video: VideoItem, suffix: string, index: number): VideoItem => ({
  ...video,
  id: createUniqueId(video, suffix, index),
});

const shuffleVideos = (videos: VideoItem[]) => {
  const copy = [...videos];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

type RegistryEntry = {
  index: number;
  handle: VideoPlayerHandle;
};

export const HomeScreen: React.FC = () => {
  const iterationRef = useRef(0);
  const [refreshing, setRefreshing] = useState(false);
  const [videos, setVideos] = useState<VideoItem[]>(() =>
    mockVideos.map((video, index) => withUniqueId(video, 'initial', index)),
  );
  const registryRef = useRef<Map<string, RegistryEntry>>(new Map());
  const { activeIndex, onViewableItemsChanged, viewabilityConfig } = useActiveItem();

  const handleToggleMute = useCallback((videoIndex: number, muted: boolean) => {
    console.log('toggle-mute', videoIndex, muted);
  }, []);

  const handleLike = useCallback((video: VideoItem) => {
    console.log('like', video.id);
  }, []);

  const handleComment = useCallback((video: VideoItem) => {
    console.log('comment', video.id);
  }, []);

  const handleShare = useCallback((video: VideoItem) => {
    console.log('share', video.id);
  }, []);

  const keyExtractor = useCallback((item: VideoItem) => item.id, []);

  const getItemLayout = useCallback(
    (_: VideoItem[] | null | undefined, index: number) => ({
      length: SCREEN_HEIGHT,
      offset: SCREEN_HEIGHT * index,
      index,
    }),
    [],
  );

  const registerHandle = useCallback(
    (index: number, handle: VideoPlayerHandle | null) => {
      const item = videos[index];
      if (!item) return;
      const registry = registryRef.current;
      if (!handle) {
        registry.delete(item.id);
        return;
      }

      registry.set(item.id, { index, handle });

      if (Math.abs(index - activeIndex) <= 1) {
        handle.prepare?.();
      }
    },
    [activeIndex, videos],
  );

  const syncPlayers = useCallback(() => {
    const registry = registryRef.current;
    const nextActive = videos[activeIndex];

    registry.forEach((entry, id) => {
      const { index, handle } = entry;
      if (videos[index]?.id !== id) {
        // Item index has shifted; try to realign
        const nextIndex = videos.findIndex((video) => video.id === id);
        if (nextIndex === -1) {
          registry.delete(id);
          return;
        }
        entry.index = nextIndex;
      }

      if (entry.index === activeIndex) {
        handle.prepare?.();
      } else {
        handle.pause?.();
        if (Math.abs(entry.index - activeIndex) > 0) {
          handle.seekToStart?.();
        }
        if (Math.abs(entry.index - activeIndex) > MAX_BUFFER_DISTANCE) {
          handle.unload?.();
        }
      }
    });

    const neighbours = [activeIndex - 1, activeIndex + 1];
    neighbours.forEach((neighbourIndex) => {
      const neighbourItem = videos[neighbourIndex];
      if (!neighbourItem) return;
      const neighbourEntry = registry.get(neighbourItem.id);
      neighbourEntry?.handle.prepare?.();
    });
    if (nextActive) {
      const activeEntry = registry.get(nextActive.id);
      activeEntry?.handle.prepare?.();
    }
  }, [activeIndex, videos]);

  useEffect(() => {
    syncPlayers();
  }, [activeIndex, syncPlayers]);

  useEffect(() => () => {
    registryRef.current.clear();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    registryRef.current.clear();
    const shuffled = shuffleVideos(mockVideos).map((video, index) =>
      withUniqueId(video, `refresh-${Date.now()}`, index),
    );
    setVideos(shuffled);
    iterationRef.current = 0;
    setTimeout(() => {
      setRefreshing(false);
    }, 400);
  }, []);

  const onEndReached = useCallback(() => {
    iterationRef.current += 1;
    setVideos((prev) => [
      ...prev,
      ...mockVideos.map((video, index) =>
        withUniqueId(video, `more-${iterationRef.current}`, index),
      ),
    ]);
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: VideoItem; index: number }) => (
      <View style={styles.itemContainer}>
        <VideoCard
          item={item}
          index={index}
          isActive={activeIndex === index}
          onToggleMute={handleToggleMute}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
          onRegister={registerHandle}
        />
      </View>
    ),
    [activeIndex, handleComment, handleLike, handleShare, handleToggleMute, registerHandle],
  );

  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor="#ffffff"
        colors={["#ff4d6d"]}
      />
    ),
    [onRefresh, refreshing],
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <FlatList
        data={videos}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={getItemLayout}
        initialNumToRender={INITIAL_RENDER}
        windowSize={5}
        maxToRenderPerBatch={3}
        removeClippedSubviews
        refreshControl={refreshControl}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  itemContainer: {
    height: SCREEN_HEIGHT,
  },
});
