import {useMemo} from "react";
import {getRecipesByAuthor} from "../mock/languages";
import {useTranslator} from "./useTranslator";
import {useSubscriptions} from "../contexts/subscriptions.context";
import {getAuthor} from "../mock/languages/author";

export const useAuthor = (id) => {
    const [,,language] = useTranslator()
    const [isSubscriber] = useSubscriptions();

    const author = useMemo(() => getAuthor(id, language), [id, language]);
const recipes = useMemo(() => getRecipesByAuthor(id, language, !isSubscriber), [id, language, !isSubscriber]);
    return [author, recipes];
}