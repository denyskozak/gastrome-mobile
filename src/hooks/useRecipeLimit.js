import {useCallback} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useSubscriptions} from "../contexts/subscriptions.context";

export const RECIPES_VIEWED_LIMIT_KEY = 'RECIPES_VIEWED_LIMIT_KEY';
export const DAILY_RECIPES_LIMIT = 3;

export const useRecipeLimit = () => {
    const [isSubscriber] = useSubscriptions();


    const checkRecipeLimit = useCallback(async () => {
        if (isSubscriber) {
            return true;
        }

        const today = new Date().toISOString().split('T')[0];
        const storedLimit = await AsyncStorage.getItem(RECIPES_VIEWED_LIMIT_KEY);
        let viewedData = storedLimit ? JSON.parse(storedLimit) : {date: today, count: 0};

        if (viewedData.date !== today) {
            viewedData = {date: today, count: 0};
        }

        if (viewedData.count >= DAILY_RECIPES_LIMIT) {
            return false;
        }

        viewedData.count += 1;
        await AsyncStorage.setItem(RECIPES_VIEWED_LIMIT_KEY, JSON.stringify(viewedData));
        return true;
    }, [isSubscriber]);

    return {
        checkRecipeLimit
    }
}