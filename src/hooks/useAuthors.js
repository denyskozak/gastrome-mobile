import {useMemo} from "react";
import {getAuthors} from "../mock/languages/author";
import {useTranslator} from "./useTranslator";

export const useAuthors = () => {
    const [,,language] = useTranslator()

    const authors = useMemo(() => getAuthors(language), [language]);
    return [authors];
}