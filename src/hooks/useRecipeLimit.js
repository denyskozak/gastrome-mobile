import {useCallback} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useSubscriptions} from "../contexts/subscriptions.context";
import {FREE_RECIPES_OPENED_KEY} from "../constants/asyncStoreKeys";

export const RECIPES_VIEWED_LIMIT_KEY = 'RECIPES_VIEWED_LIMIT_KEY';
export const DAILY_RECIPES_LIMIT = 5;
const getTodayDate = () => new Date().toISOString().split('T')[0];

const normalizeOpenedRecipes = (openedRecipes) => {
    const today = getTodayDate();
    if (!openedRecipes || openedRecipes.date !== today) {
        return {date: today, items: {}};
    }

    return openedRecipes;
};

export const useRecipeLimit = () => {
    const [isSubscriber] = useSubscriptions();


    const checkRecipeLimit = useCallback(async (recipeId) => {
        if (isSubscriber) {
            return true;
        }

        const today = getTodayDate();
        const [storedLimit, storedOpenedRecipes] = await Promise.all([
            AsyncStorage.getItem(RECIPES_VIEWED_LIMIT_KEY),
            AsyncStorage.getItem(FREE_RECIPES_OPENED_KEY),
        ]);
        let viewedData = storedLimit ? JSON.parse(storedLimit) : {date: today, count: 0};
        let openedRecipes = storedOpenedRecipes ? JSON.parse(storedOpenedRecipes) : {date: today, items: {}};

        if (viewedData.date !== today) {
            viewedData = {date: today, count: 0};
        }

        openedRecipes = normalizeOpenedRecipes(openedRecipes);

        if (recipeId && openedRecipes.items[recipeId]) {
            return true;
        }

        if (viewedData.count >= DAILY_RECIPES_LIMIT) {
            return false;
        }

        viewedData.count += 1;
        if (recipeId) {
            openedRecipes.items[recipeId] = Date.now();
        }

        await Promise.all([
            AsyncStorage.setItem(RECIPES_VIEWED_LIMIT_KEY, JSON.stringify(viewedData)),
            AsyncStorage.setItem(FREE_RECIPES_OPENED_KEY, JSON.stringify(openedRecipes)),
        ]);
        return true;
    }, [isSubscriber]);

    return {
        checkRecipeLimit
    }
}
