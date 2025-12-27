import {useCallback, useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {FREE_RECIPES_OPENED_KEY, FREE_RECIPES_USAGE_KEY} from '../constants/asyncStoreKeys';

const DAILY_FREE_RECIPES_LIMIT = 5;
const getTodayDate = () => new Date().toISOString().slice(0, 10);

const normalizeUsage = (usage) => {
    const today = getTodayDate();

    if (!usage || usage.date !== today) {
        return {date: today, count: 0};
    }

    return usage;
};

const normalizeOpenedRecipes = (openedRecipes) => {
    const today = getTodayDate();

    if (!openedRecipes || openedRecipes.date !== today) {
        return {date: today, items: {}};
    }

    return openedRecipes;
};

export const useFreeRecipesQuota = () => {
    const [usage, setUsage] = useState({date: getTodayDate(), count: 0});
    const [openedRecipes, setOpenedRecipes] = useState({date: getTodayDate(), items: {}});
    const [isLoading, setIsLoading] = useState(true);

    const remaining = useMemo(() => Math.max(DAILY_FREE_RECIPES_LIMIT - usage.count, 0), [usage.count]);

    const persistUsage = useCallback(async (nextUsage) => {
        await AsyncStorage.setItem(FREE_RECIPES_USAGE_KEY, JSON.stringify(nextUsage));
    }, []);

    const persistOpenedRecipes = useCallback(async (nextOpenedRecipes) => {
        await AsyncStorage.setItem(FREE_RECIPES_OPENED_KEY, JSON.stringify(nextOpenedRecipes));
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const [storedUsage, storedOpenedRecipes] = await Promise.all([
                    AsyncStorage.getItem(FREE_RECIPES_USAGE_KEY),
                    AsyncStorage.getItem(FREE_RECIPES_OPENED_KEY),
                ]);
                const parsedUsage = storedUsage ? JSON.parse(storedUsage) : null;
                const parsedOpenedRecipes = storedOpenedRecipes ? JSON.parse(storedOpenedRecipes) : null;
                const normalizedUsage = normalizeUsage(parsedUsage);
                const normalizedOpenedRecipes = normalizeOpenedRecipes(parsedOpenedRecipes);

                setUsage(normalizedUsage);
                setOpenedRecipes(normalizedOpenedRecipes);
                await Promise.all([
                    persistUsage(normalizedUsage),
                    persistOpenedRecipes(normalizedOpenedRecipes),
                ]);
            } catch (error) {
                console.log('Failed to load free recipe usage', error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [persistOpenedRecipes, persistUsage]);

    const consumeFreeRecipe = useCallback(async (recipeId) => {
        try {
            const [storedUsage, storedOpenedRecipes] = await Promise.all([
                AsyncStorage.getItem(FREE_RECIPES_USAGE_KEY),
                AsyncStorage.getItem(FREE_RECIPES_OPENED_KEY),
            ]);
            const parsedUsage = storedUsage ? JSON.parse(storedUsage) : null;
            const parsedOpenedRecipes = storedOpenedRecipes ? JSON.parse(storedOpenedRecipes) : null;
            const normalizedUsage = normalizeUsage(parsedUsage);
            const normalizedOpenedRecipes = normalizeOpenedRecipes(parsedOpenedRecipes);

            if (recipeId && normalizedOpenedRecipes.items[recipeId]) {
                setUsage(normalizedUsage);
                setOpenedRecipes(normalizedOpenedRecipes);
                return Math.max(DAILY_FREE_RECIPES_LIMIT - normalizedUsage.count, 0);
            }

            const nextCount = Math.min(normalizedUsage.count + 1, DAILY_FREE_RECIPES_LIMIT);
            const nextUsage = {date: getTodayDate(), count: nextCount};
            const nextOpenedRecipes = {
                date: getTodayDate(),
                items: recipeId
                    ? {...normalizedOpenedRecipes.items, [recipeId]: Date.now()}
                    : normalizedOpenedRecipes.items,
            };

            setUsage(nextUsage);
            setOpenedRecipes(nextOpenedRecipes);

            await Promise.all([
                persistUsage(nextUsage),
                persistOpenedRecipes(nextOpenedRecipes),
            ]);

            return Math.max(DAILY_FREE_RECIPES_LIMIT - nextUsage.count, 0);
        } catch (error) {
            console.log('Failed to persist free recipe usage', error);
        }

        return remaining;
    }, [persistOpenedRecipes, persistUsage, remaining]);

    return {
        remaining,
        limit: DAILY_FREE_RECIPES_LIMIT,
        isLoading,
        consumeFreeRecipe,
    };
};
