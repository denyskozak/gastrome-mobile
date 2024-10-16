import {recipes as enRecipes, authors as enAuthors} from './en';
import {recipes as csRecipes, authors as csAuthors} from './cs';

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
    en: {
        recipes: enRecipes,
        authors: enAuthors,
    },
    cs: {
        recipes: csRecipes,
        authors: csAuthors,
    },
};

console.log(333, translates)
const getRecipesByLanguage = (language = 'en') => {
    if (!(language in translates)) return [];
    return prepareItems(translates[language].recipes)
};

export const getRecipes = (free = false, language = 'en') => filterByFree(getRecipesByLanguage(language), free)
export const getRecipesByAuthor = (authorId, language = 'en') => {
    const items = getRecipesByLanguage(language);
    return items.filter(item  => item.author?.id === authorId);
};


// Authors
export const getAuthor = (id, language = 'en') => {
    return translates[language].authors.find(item => item.id = id);
};

export const getAuthors = (language = 'en') => {
    return translates[language].authors;
};
