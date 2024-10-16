import {useSubscriptions} from "../contexts/subscriptions.context";
import {getRecipes} from "../mock/languages";
import {useTranslator} from "./useTranslator";
import {useMemo} from "react";

export const useRecipes = () => {
    const [isSubscriber] = useSubscriptions();
    const [,,language] = useTranslator();
    const recipes = useMemo(() => getRecipes(!isSubscriber, language), [isSubscriber, language]);

    return [recipes];
}