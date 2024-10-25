import {recipes as enRecipes} from './en/recipes';
import {recipes as csRecipes} from './cs/recipes';

import {recipeImageById} from "../recipeImages";

const getRandomViewCount = () => Math.round(Math.random() * 1000);
const getFreeField = item => item.free;
const addRandomViewCount = item => ({...item, viewed: getRandomViewCount()});
const addImageSource = item => ({...item, image: recipeImageById[item.id]});
const filterByHasVideo = (item) => {
    return Boolean(item.hasVideoSteps);
};
const filterByFree = (items = [], free = false) => free ? items.filter(getFreeField) : items

const prepareItems = items => items
    .map(addRandomViewCount)
    .map(addImageSource)
    .filter(filterByHasVideo);

const translates = {
    en: enRecipes,
    cs: csRecipes,
};

const getRecipesByLanguage = (language = 'en') => {
    if (!(language in translates)) return [];
    return prepareItems(translates[language])
};

export const getRecipes = (free = false, language = 'en') => filterByFree(getRecipesByLanguage(language), free)
export const getRecipesByAuthor = (authorId, language = 'en', free = false) => {
    const items = getRecipesByLanguage(language);
    return items.filter(item  => item.author?.id === authorId);
};
