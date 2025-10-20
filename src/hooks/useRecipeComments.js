import {useMemo} from 'react';
import {getCommentsByRecipeId} from '../mock/comments';

export const useRecipeComments = (recipeId) => {
    return useMemo(() => getCommentsByRecipeId(recipeId), [recipeId]);
};
