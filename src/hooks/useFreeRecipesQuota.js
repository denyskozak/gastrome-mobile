import {useCallback, useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {FREE_RECIPES_USAGE_KEY} from '../constants/asyncStoreKeys';

const DAILY_FREE_RECIPES_LIMIT = 3;
const getTodayDate = () => new Date().toISOString().slice(0, 10);

const normalizeUsage = (usage) => {
    const today = getTodayDate();

    if (!usage || usage.date !== today) {
        return {date: today, count: 0};
    }

    return usage;
};

export const useFreeRecipesQuota = () => {
    const [usage, setUsage] = useState({date: getTodayDate(), count: 0});
    const [isLoading, setIsLoading] = useState(true);

    const remaining = useMemo(() => Math.max(DAILY_FREE_RECIPES_LIMIT - usage.count, 0), [usage.count]);

    const persistUsage = useCallback(async (nextUsage) => {
        await AsyncStorage.setItem(FREE_RECIPES_USAGE_KEY, JSON.stringify(nextUsage));
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const storedUsage = await AsyncStorage.getItem(FREE_RECIPES_USAGE_KEY);
                const parsedUsage = storedUsage ? JSON.parse(storedUsage) : null;
                const normalizedUsage = normalizeUsage(parsedUsage);

                setUsage(normalizedUsage);
                await persistUsage(normalizedUsage);
            } catch (error) {
                console.log('Failed to load free recipe usage', error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [persistUsage]);

    const consumeFreeRecipe = useCallback(async () => {
        let nextUsage = {date: getTodayDate(), count: 0};

        setUsage((currentUsage) => {
            const normalizedUsage = normalizeUsage(currentUsage);
            const nextCount = Math.min(normalizedUsage.count + 1, DAILY_FREE_RECIPES_LIMIT);
            nextUsage = {date: getTodayDate(), count: nextCount};

            return nextUsage;
        });

        try {
            await persistUsage(nextUsage);
        } catch (error) {
            console.log('Failed to persist free recipe usage', error);
        }

        return Math.max(DAILY_FREE_RECIPES_LIMIT - nextUsage.count, 0);
    }, [persistUsage]);

    return {
        remaining,
        limit: DAILY_FREE_RECIPES_LIMIT,
        isLoading,
        consumeFreeRecipe,
    };
};
