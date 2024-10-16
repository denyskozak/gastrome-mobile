import {useMemo} from "react";
import {getAuthors} from "../mock/languages";

export const useAuthors = () => {
    const authors = useMemo(() => getAuthors(), []);
    return [authors];
}