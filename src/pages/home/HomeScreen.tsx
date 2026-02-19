import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import {isAvailableAsync, requestReview} from 'expo-store-review';
import {
    Dimensions,
    FlatList,
    RefreshControl,
    StatusBar,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import {VideoCard, VideoPlayerHandle} from '../../components/video/VideoCard';
import type {VideoItem} from '../../types/video';
import {useActiveItem} from '../../hooks/useActiveItem';
import {useRecipes} from '../../hooks/useRecipes';
import {useAWS} from '../../hooks/useAWS';
import type {ImageSourcePropType} from 'react-native';
import {recipeRoute} from '../recipes/navigation/recipes.routes';
import {handleSocialShare} from '../../utilities/socialShare';
import {renderIngredient} from '../recipe/recipe.renders';
import {useSettings} from '../../contexts/settings.context';
import {useTranslator} from '../../hooks/useTranslator';
import {useBackgroundMusic} from '../../hooks/useBackgroundMusic';
import type {BackgroundMusicSource} from '../../hooks/useBackgroundMusic';
import {useFavorites} from '../../contexts/favorites.context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Spaces} from "../../styles/spaces";
import {Animated} from "../../components/atomic/animated/animated.component";
import {Animation} from "../../components/atomic/animation/animation.component";
import {useSplashScreen} from "../../contexts/splash-screen.context";
import { useTheme } from '../../hooks/useTheme';
import {SubscriptionsModal} from "../../components/templates/subscriptions-modal/subscriptions-modal";
import {useSubscriptions} from "../../contexts/subscriptions.context";
import {canViewRecipeToday, getDailyViewedRecipes, markRecipeViewedToday} from "../../utilities/dailyRecipeLimit";
import {useFreeRecipes} from "../../contexts/free-recipes";

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_BUFFER_DISTANCE = 2;
const INITIAL_RENDER = 3;
const INITIAL_LOOP_COUNT = 3;

const createUniqueId = (video: VideoItem, suffix: string, index: number) => `${video.id}-${suffix}-${index}`;

const withUniqueId = (video: VideoItem, suffix: string, index: number): VideoItem => ({
    ...video,
    id: createUniqueId(video, suffix, index),
});

const buildLoopedVideos = (videos: VideoItem[], suffix: string, loopCount: number) => {
    const result: VideoItem[] = [];
    for (let loopIndex = 0; loopIndex < loopCount; loopIndex += 1) {
        const loopSuffix = `${suffix}-${loopIndex}`;
        result.push(...videos.map((video, index) => withUniqueId(video, loopSuffix, index)));
    }
    return result;
};

const runOnNextFrame = (callback: () => void) => {
    const raf =
        typeof globalThis !== 'undefined' && typeof (globalThis as any).requestAnimationFrame === 'function'
            ? (globalThis as any).requestAnimationFrame
            : null;

    if (raf) {
        raf(() => {
            callback();
        });
    } else {
        setTimeout(callback, 0);
    }
};

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

const BACKGROUND_MUSIC_SOURCE: BackgroundMusicSource = require('../../../assets/background-track.mp3');

type FeedFilter = 'all' | 'free' | 'favorites';

export const HomeScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const listRef = useRef<FlatList<VideoItem>>(null);
    const shouldResetToMiddleRef = useRef(false);
    const [refreshing, setRefreshing] = useState(false);
    const [recipes] = useRecipes(true);
    const {getCookingStepURL} = useAWS();
    const getCookingStepUrlRef = useRef(getCookingStepURL);
    const navigation = useNavigation<any>();
    const [settings] = useSettings();
    const [tCommon] = useTranslator('common');
    const [tHome] = useTranslator('pages.home');
    const [isSubscriber] = useSubscriptions();
    const [viewedRecipeIds, setViewedRecipeIds] = useFreeRecipes()

    const [allVideos, setAllVideos] = useState<VideoItem[]>([]);
    const registryRef = useRef<Map<string, RegistryEntry>>(new Map());
    const {activeIndex, onViewableItemsChanged, viewabilityConfig, setActiveIndex} = useActiveItem();
    const allVideosLength = allVideos.length;
    const [showArrow, setShowArrow] = useState(false);
    const [isVisibleCustomSplashScreen,setIsVisibleCustomSplashScreen] = useSplashScreen();
    const { theme } = useTheme();
    const styles = useStyles(theme);
    const [isSubscriptionsOpened, setSubscriptionsOpened] = useState(false);

    const measure = settings?.measure ?? 'g';
    const [isBackgroundMusicEnabled, setIsBackgroundMusicEnabled] = useState(true);
    const {
        start: startBackgroundMusic,
        stop: stopBackgroundMusic,
        seekToRandomPosition: randomizeBackgroundMusicPosition,
    } = useBackgroundMusic(
        BACKGROUND_MUSIC_SOURCE,
        {volume: 0.05},
    );
    const isFocused = useIsFocused();
    const [favoriteIds, toggleFavorite] = useFavorites() as [string[], (value: string) => void];
    const [feedFilter, setFeedFilter] = useState<FeedFilter>('all');

    useEffect(() => {
        if (isBackgroundMusicEnabled && isFocused) {
            void (async () => {
                await randomizeBackgroundMusicPosition();
                await startBackgroundMusic();
            })();
        } else {
            void stopBackgroundMusic();
        }
    }, [
        isBackgroundMusicEnabled,
        isFocused,
        randomizeBackgroundMusicPosition,
        startBackgroundMusic,
        stopBackgroundMusic,
    ]);

    useEffect(() => () => {
        void stopBackgroundMusic();
    }, [stopBackgroundMusic]);

    useEffect(() => {
        getCookingStepUrlRef.current = getCookingStepURL;
    }, [getCookingStepURL]);



    const recipeMap = useMemo(() => {
        const map = new Map<string, any>();
        recipes.forEach((recipeItem: any) => {
            if (recipeItem?.id) {
                map.set(recipeItem.id, recipeItem);
            }
        });
        return map;
    }, [recipes]);

    const baseVideos = useMemo(() => {
        return recipes
            .map((recipe) => {
                if (!recipe?.id) {
                    return null;
                }
                const stepsCount = Array.isArray(recipe.steps) ? recipe.steps.length : 0;

                const stepNumber = recipe.isSingleVideo ? 1 : stepsCount > 0 ? stepsCount : 1;
                const source = getCookingStepUrlRef.current(recipe.id, stepNumber);
                if (!source) {
                    return null;
                }

                const poster = resolveAssetUri(recipe.image);
                const authorAvatar = resolveAssetUri(recipe.author?.image) ?? DEFAULT_AUTHOR_AVATAR;

                return {
                    id: `recipe-${recipe.id}`,
                    recipeId: recipe.id,
                    source,
                    poster,
                    title: recipe.title ?? tHome('defaultRecipeTitle') ?? 'Recipe',
                    author: {
                        name: recipe.author?.name ?? tHome('defaultAuthorName') ?? 'Gastro & Me',
                        avatar: authorAvatar,
                    },
                    description: recipe.description,
                    tags: recipe.filters,
                } satisfies VideoItem;
            })
            .filter((item): item is VideoItem => Boolean(item));
    }, [recipes, tHome]);

    const shuffledBaseVideos = useMemo(
        () => shuffleVideos(baseVideos),
        [baseVideos],
    );

    const favoriteVideos = useMemo(() => {
        if (!favoriteIds.length) {
            return [];
        }

        const favoriteIdSet = new Set(favoriteIds);
        return baseVideos.filter((video) =>
            video.recipeId ? favoriteIdSet.has(video.recipeId) : false,
        );
    }, [baseVideos, favoriteIds]);

    const freeVideos = useMemo(() => {
        if (isSubscriber || !viewedRecipeIds.length) {
            return [];
        }

        const viewedIds = new Set(viewedRecipeIds);
        return baseVideos.filter((video) =>
            video.recipeId ? viewedIds.has(String(video.recipeId)) : false,
        );
    }, [baseVideos, isSubscriber, viewedRecipeIds]);

    const displayedVideos = useMemo(() => {
        if (feedFilter === 'favorites') {
            return favoriteVideos;
        }
        if (feedFilter === 'free') {
            return freeVideos;
        }
        return allVideos;
    }, [allVideos, favoriteVideos, feedFilter, freeVideos]);

    const displayedVideosLength = displayedVideos.length;

    useEffect(() => {
        if (!shuffledBaseVideos.length) {
            if (allVideosLength) {
                registryRef.current.clear();
                setAllVideos([]);
            }
            shouldResetToMiddleRef.current = false;
            setActiveIndex(0);
            return;
        }

        const suffixBase = `initial-${Date.now()}`;
        const prepared = buildLoopedVideos(shuffledBaseVideos, suffixBase, INITIAL_LOOP_COUNT);

        registryRef.current.clear();
        setAllVideos(prepared);
        setActiveIndex(0);
        shouldResetToMiddleRef.current = true;
    }, [allVideosLength, setActiveIndex, shuffledBaseVideos]);

    const handleLike = useCallback(
        (video: VideoItem, liked: boolean) => {
            if (!video.recipeId) {
                return;
            }

            const isAlreadyFavorite = favoriteIds.includes(video.recipeId);
            if (liked !== isAlreadyFavorite) {
                toggleFavorite(video.recipeId);
            }
        },
        [favoriteIds, toggleFavorite],
    );

    const handleToggleBackgroundMusic = useCallback(() => {
        setIsBackgroundMusicEnabled((prev) => !prev);
    }, []);

    const handleShare = useCallback(
        async (video: VideoItem) => {
            if (!video.recipeId) {
                return;
            }

            const recipe = recipeMap.get(video.recipeId);
            if (!recipe) {
                return;
            }

            try {
                await Haptics.selectionAsync();
                const ingredientsList = Array.isArray(recipe.ingredients)
                    ? recipe.ingredients
                        .map((ingredient: any) => renderIngredient(ingredient, measure, tCommon))
                        .join(', \n')
                    : '';
                const shareTitle = recipe.title ?? tHome('defaultRecipeTitle') ?? 'Recipe';
                await handleSocialShare(
                    tHome('shareMessage', {
                        title: shareTitle,
                        ingredients: ingredientsList,
                    }) ??
                    `I like to share ${shareTitle} recipe, ingredients: \n\n${ingredientsList}`,
                );
                isAvailableAsync().then(() => requestReview());
            } catch (error: any) {
                alert(error?.message ?? tHome('shareError') ?? 'Unable to share');
            }
        },
        [measure, recipeMap, tCommon, tHome],
    );

    const handleOpenRecipe = useCallback(
        async (video: VideoItem) => {
            if (!video.recipeId) {
                return;
            }

            if (!isSubscriber) {
                try {
                    const {hasViewed, canViewNew} = await canViewRecipeToday(video.recipeId);
                    if (!hasViewed && !canViewNew) {
                        setSubscriptionsOpened(true);
                        return;
                    }
                    if (!hasViewed) {
                        await markRecipeViewedToday(video.recipeId);
                        setViewedRecipeIds((prev) => {
                            const id = String(video.recipeId);
                            return prev.includes(id) ? prev : [...prev, id];
                        });
                    }
                } catch (error) {
                    // allow navigation if storage fails
                }
            }

            navigation.navigate(recipeRoute, {id: video.recipeId});
        },
        [isSubscriber, navigation, setSubscriptionsOpened, setViewedRecipeIds],
    );

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
            const currentVideos = displayedVideos;
            const item = currentVideos[index];
            if (!item) return;
            const registry = registryRef.current;
            if (!handle) {
                registry.delete(item.id);
                return;
            }

            registry.set(item.id, {index, handle});

            if (Math.abs(index - activeIndex) <= 1) {
                handle.prepare?.();
            }
        },
        [activeIndex, displayedVideos],
    );

    const syncPlayers = useCallback(() => {
        const registry = registryRef.current;
        const currentVideos = displayedVideos;
        const nextActive = currentVideos[activeIndex];

        registry.forEach((entry, id) => {
            const {handle} = entry;
            if (currentVideos[entry.index]?.id !== id) {
                // Item index has shifted; try to realign
                const nextIndex = currentVideos.findIndex((video) => video.id === id);
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
            const neighbourItem = currentVideos[neighbourIndex];
            if (!neighbourItem) return;
            const neighbourEntry = registry.get(neighbourItem.id);
            neighbourEntry?.handle.prepare?.();
        });
        if (nextActive) {
            const activeEntry = registry.get(nextActive.id);
            activeEntry?.handle.prepare?.();
        }
    }, [activeIndex, displayedVideos]);

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
            const shuffled = shuffleVideos(baseVideos);
            const looped = buildLoopedVideos(shuffled, suffix, INITIAL_LOOP_COUNT);
            setAllVideos(looped);
            setActiveIndex(0);
            shouldResetToMiddleRef.current = true;
        }
        setTimeout(() => {
            setRefreshing(false);
        }, 400);
    }, [baseVideos, setActiveIndex]);

    useEffect(() => {
        registryRef.current.clear();
        setActiveIndex(0);
        if (feedFilter === 'all') {
            shouldResetToMiddleRef.current = true;
        }
    }, [feedFilter, setActiveIndex]);

    useEffect(() => {
        if (isSubscriber && feedFilter === 'free') {
            setFeedFilter('all');
        }
    }, [feedFilter, isSubscriber]);

    useEffect(() => {
        if (!displayedVideosLength) {
            if (activeIndex !== 0) {
                setActiveIndex(0);
            }
            return;
        }

        if (activeIndex >= displayedVideosLength) {
            setActiveIndex(displayedVideosLength - 1);
        }
    }, [activeIndex, displayedVideosLength, setActiveIndex]);

    useEffect(() => {
        if (feedFilter !== 'all') {
            return;
        }

        if (!shouldResetToMiddleRef.current) {
            return;
        }

        if (!shuffledBaseVideos.length || !allVideosLength) {
            return;
        }

        shouldResetToMiddleRef.current = false;
        const targetIndex = shuffledBaseVideos.length;

        runOnNextFrame(() => {
            try {
                listRef.current?.scrollToIndex({index: targetIndex, animated: false});
            } catch {
                listRef.current?.scrollToOffset({offset: SCREEN_HEIGHT * targetIndex, animated: false});
            }
            setActiveIndex(targetIndex);
        });
    }, [allVideosLength, feedFilter, setActiveIndex, shuffledBaseVideos.length]);

    useEffect(() => {
        if (feedFilter !== 'all') {
            return;
        }

        const loopSize = shuffledBaseVideos.length;
        if (!loopSize || !allVideosLength) {
            return;
        }

        const minIndex = loopSize;
        const maxIndex = allVideosLength - loopSize - 1;

        if (activeIndex < minIndex) {
            const nextIndex = activeIndex + loopSize;
            setActiveIndex(nextIndex);
            runOnNextFrame(() => {
                try {
                    listRef.current?.scrollToIndex({index: nextIndex, animated: false});
                } catch {
                    listRef.current?.scrollToOffset({offset: SCREEN_HEIGHT * nextIndex, animated: false});
                }
            });
        } else if (activeIndex > maxIndex) {
            const nextIndex = activeIndex - loopSize;
            setActiveIndex(nextIndex);
            runOnNextFrame(() => {
                try {
                    listRef.current?.scrollToIndex({index: nextIndex, animated: false});
                } catch {
                    listRef.current?.scrollToOffset({offset: SCREEN_HEIGHT * nextIndex, animated: false});
                }
            });
        }
    }, [activeIndex, allVideosLength, feedFilter, setActiveIndex, shuffledBaseVideos.length]);
    const renderItem = useCallback(
        ({item, index}: { item: VideoItem; index: number }) => {
            const isFavorite = item.recipeId ? favoriteIds.includes(item.recipeId) : false;
            const showFreeBadge = !isSubscriber && item.recipeId
                ? viewedRecipeIds.includes(String(item.recipeId))
                : false;
            return (
                <View style={styles.itemContainer}>
                    <VideoCard
                        item={item}
                        index={index}
                        onVideoLoad={() => {
                            if (isVisibleCustomSplashScreen) {
                               setTimeout(() => {
                                   setIsVisibleCustomSplashScreen(false);
                                   setTimeout(() => {
                                       setShowArrow(true)
                                   }, 5000)
                                   setTimeout(() => {
                                       setShowArrow(false)
                                   }, 9000)
                               }, 1000)
                            }
                        }}
                        isActive={activeIndex === index}
                        onLike={handleLike}
                        onToggleMusic={handleToggleBackgroundMusic}
                        isMusicEnabled={isBackgroundMusicEnabled}
                        onShare={handleShare}
                        onPressMeta={handleOpenRecipe}
                        onRegister={registerHandle}
                        isFavorite={isFavorite}
                        showFreeBadge={showFreeBadge}
                    />
                </View>
            );
        },
        [
            activeIndex,
            favoriteIds,
            handleLike,
            handleOpenRecipe,
            handleShare,
            handleToggleBackgroundMusic,
            registerHandle,
            isBackgroundMusicEnabled,
            isSubscriber,
            viewedRecipeIds,
        ],
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

    const listExtraData = useMemo(
        () => ({favoriteIds, isBackgroundMusicEnabled, feedFilter, viewedRecipeIds}),
        [favoriteIds, feedFilter, isBackgroundMusicEnabled, viewedRecipeIds],
    );

    const feedOptions = useMemo(
        () => {
            const options = [{key: 'all' as FeedFilter, label: tHome('feedAll') ?? 'All'}];
            if (!isSubscriber && freeVideos.length > 0) {
                options.push({key: 'free' as FeedFilter, label: tHome('feedFree') ?? 'Free'});
            }
            if (favoriteIds.length > 0) {
                options.push({key: 'favorites' as FeedFilter, label: tHome('feedFavorites') ?? 'Favorites'});
            }
            return options;
        },
        [isSubscriber, freeVideos.length, favoriteIds.length, tHome],
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
            <View style={[styles.feedToggleContainer, {top: insets.top + Spaces.xxlarge}]}>
                {feedOptions.map((option) => {
                    const isActive = feedFilter === option.key;
                    return (
                        <TouchableOpacity
                            key={option.key}
                            style={[styles.feedToggleButton, isActive ? styles.feedToggleButtonActive : null]}
                            activeOpacity={0.8}
                            onPress={() => setFeedFilter(option.key)}
                        >
                            <Text
                                style={[styles.feedToggleText, isActive ? styles.feedToggleTextActive : null]}
                            >
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <FlatList
                ref={listRef}
                data={displayedVideos}
                extraData={listExtraData}
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
                removeClippedSubviews={false}
                refreshControl={refreshControl}
                key={feedFilter}
            />
            {feedFilter === 'favorites' && !displayedVideosLength ? (
                <View style={styles.emptyFavoritesContainer}>
                    <Text style={styles.emptyFavoritesText}>
                        {tHome('favoritesEmptyFeed') ?? 'You do not have favorite videos yet'}
                    </Text>
                </View>
            ) : null}
            {showArrow && (
                <>
                    <Animated style={styles.helpBackdropAnimated}>
                        <View style={styles.helpBackdrop}>
                        </View>
                    </Animated>
                    <Animated style={styles.helpArrow} delay={500}>
                        <Animation name="swipeDown" height={Spaces.xxxlarge * 4} speed={0.8} width={Spaces.xxxlarge * 4}/>
                    </Animated>
                </>

            )}
            <SubscriptionsModal
                isOpen={isSubscriptionsOpened}
                onChangeVisible={() => setSubscriptionsOpened(false)}
            />
        </View>
    );
};

const useStyles = (theme: { colors: Record<string, string> }) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    itemContainer: {
        height: SCREEN_HEIGHT,
    },
    feedToggleContainer: {
        position: 'absolute',
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 20,
        padding: 4,
        zIndex: 10,
    },
    feedToggleButton: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 16,
    },
    feedToggleButtonActive: {
        backgroundColor: '#ffffff',
    },
    feedToggleText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    feedToggleTextActive: {
        color: '#000000',
    },
    emptyFavoritesContainer: {
        position: 'absolute',
        top: '45%',
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    helpBackdropAnimated: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    helpBackdrop: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.backgroundColor,
        opacity: 0.7
    },
    emptyFavoritesText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },
    helpArrow: {
        position: 'absolute',
        opacity: 1,
        alignSelf: 'center',
        bottom: '20%',
        zIndex: 2,
    },
});
