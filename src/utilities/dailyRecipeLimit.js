import AsyncStorage from '@react-native-async-storage/async-storage';
import {DAILY_VIEWED_RECIPES_KEY} from '../constants/asyncStoreKeys';

export const DAILY_RECIPE_LIMIT = 5;

const getTodayKey = () => new Date().toISOString().split('T')[0];

const normalizeDailyStore = (payload, todayKey) => {
    if (!payload || payload.date !== todayKey || !Array.isArray(payload.ids)) {
        return {date: todayKey, ids: []};
    }

    return payload;
};

const saveDailyStore = async (payload) => {
    await AsyncStorage.setItem(DAILY_VIEWED_RECIPES_KEY, JSON.stringify(payload));
};

export const getDailyViewedRecipes = async () => {
    const todayKey = getTodayKey();
    const raw = await AsyncStorage.getItem(DAILY_VIEWED_RECIPES_KEY);

    if (!raw) {
        const fresh = {date: todayKey, ids: []};
        await saveDailyStore(fresh);
        return fresh;
    }

    try {
        const parsed = JSON.parse(raw);
        const normalized = normalizeDailyStore(parsed, todayKey);

        if (normalized.date !== parsed?.date || normalized.ids.length !== parsed?.ids?.length) {
            await saveDailyStore(normalized);
        }

        return normalized;
    } catch (error) {
        const fresh = {date: todayKey, ids: []};
        await saveDailyStore(fresh);
        return fresh;
    }
};

export const canViewRecipeToday = async (recipeId) => {
    const data = await getDailyViewedRecipes();
    const normalizedId = String(recipeId);
    const hasViewed = data.ids.includes(normalizedId);
    const canViewNew = data.ids.length < DAILY_RECIPE_LIMIT;

    return {
        hasViewed,
        canViewNew,
        remaining: Math.max(DAILY_RECIPE_LIMIT - data.ids.length, 0),
    };
};

export const markRecipeViewedToday = async (recipeId) => {
    const data = await getDailyViewedRecipes();
    const normalizedId = String(recipeId);

    if (data.ids.includes(normalizedId)) {
        return data;
    }

    const next = {date: data.date, ids: [...data.ids, normalizedId]};
    await saveDailyStore(next);
    return next;
};
