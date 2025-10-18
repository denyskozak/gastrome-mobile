import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { VideoCard, VideoPlayerHandle } from '../../components/video/VideoCard';
import type { VideoItem } from '../../types/video';
import { useActiveItem } from '../../hooks/useActiveItem';
import { useRecipes } from '../../hooks/useRecipes';
import { useAWS } from '../../hooks/useAWS';
import type { ImageSourcePropType } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_BUFFER_DISTANCE = 2;
const INITIAL_RENDER = 3;

const createUniqueId = (video: VideoItem, suffix: string, index: number) => `${video.id}-${suffix}-${index}`;

const withUniqueId = (video: VideoItem, suffix: string, index: number): VideoItem => ({
  ...video,
  id: createUniqueId(video, suffix, index),
});

const resolveAssetUri = (asset: ImageSourcePropType | null | undefined) => {
  if (!asset) return undefined;
  const resolved = Image.resolveAssetSource(asset);
  return resolved?.uri ?? undefined;
};

const DEFAULT_AUTHOR_AVATAR =
  'https://images.pexels.com/photos/3771811/pexels-photo-3771811.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=120';

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
  const [recipes] = useRecipes(true);
  const { getCookingStepURL } = useAWS();
  const getCookingStepUrlRef = useRef(getCookingStepURL);

  useEffect(() => {
    getCookingStepUrlRef.current = getCookingStepURL;
  }, [getCookingStepURL]);

  const baseVideos = useMemo(() => {
    return recipes
      .map((recipe) => {
        if (!recipe?.id) {
          return null;
        }
        const stepsCount = Array.isArray(recipe.steps) ? recipe.steps.length : 0;
        const stepNumber = stepsCount > 0 ? stepsCount : 1;
        const source = getCookingStepUrlRef.current(recipe.id, stepNumber);
        if (!source) {
          return null;
        }

        const poster = resolveAssetUri(recipe.image);
        const authorAvatar = resolveAssetUri(recipe.author?.image) ?? DEFAULT_AUTHOR_AVATAR;

        return {
          id: `recipe-${recipe.id}`,
          source,
          poster,
          title: recipe.title ?? 'Recipe',
          author: {
            name: recipe.author?.name ?? 'Gastro & Me',
            avatar: authorAvatar,
          },
          description: recipe.description,
          tags: recipe.filters,
        } satisfies VideoItem;
      })
      .filter((item): item is VideoItem => Boolean(item));
  }, [recipes]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const registryRef = useRef<Map<string, RegistryEntry>>(new Map());
  const { activeIndex, onViewableItemsChanged, viewabilityConfig } = useActiveItem();
  const videosLength = videos.length;

  useEffect(() => {
    if (!baseVideos.length) {
      if (videosLength) {
        registryRef.current.clear();
        setVideos([]);
      }
      iterationRef.current = 0;
      return;
    }
    const suffix = `initial-${Date.now()}`;
    const prepared = baseVideos.map((video, index) => withUniqueId(video, suffix, index));
    registryRef.current.clear();
    setVideos(prepared);
    iterationRef.current = 0;
  }, [baseVideos, videosLength]);

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
    if (baseVideos.length) {
      const suffix = `refresh-${Date.now()}`;
      const shuffled = shuffleVideos(baseVideos).map((video, index) =>
        withUniqueId(video, suffix, index),
      );
      setVideos(shuffled);
      iterationRef.current = 0;
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 400);
  }, [baseVideos]);

  const onEndReached = useCallback(() => {
    if (!baseVideos.length) {
      return;
    }
    iterationRef.current += 1;
    const suffix = `more-${iterationRef.current}-${Date.now()}`;
    setVideos((prev) => [
      ...prev,
      ...baseVideos.map((video, index) => withUniqueId(video, suffix, index)),
    ]);
  }, [baseVideos]);

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
