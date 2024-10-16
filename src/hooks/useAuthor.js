import {useMemo} from "react";
import {getRecipesByAuthor, getAuthor} from "../mock/languages";
import {useTranslator} from "./useTranslator";

export const useAuthor = (id) => {
    const [,,language] = useTranslator()
    const author = useMemo(() => getAuthor(id, language), [id, language]);
    const recipes = useMemo(() => getRecipesByAuthor(id, language), [id, language]);
    return [author, recipes];
}