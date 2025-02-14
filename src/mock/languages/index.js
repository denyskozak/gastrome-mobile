import {recipes as enRecipes} from './en/recipes';
import {recipes as ruRecipes} from './ru/recipes';
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

const mergeBaseOnOriginLanguage = (recipe, index) => ({
    ...enRecipes[index],
    ...recipe,
    steps: enRecipes[index].steps.map((step, indexStep) => ({...step, ...recipe.steps[indexStep]})),
    ingredients: enRecipes[index].ingredients.map((ingredient, indexIngredient) => ({...ingredient, description: '', ...recipe.ingredients[indexIngredient]})),
})

const translates = {
    en: enRecipes,
    ru: ruRecipes.map(mergeBaseOnOriginLanguage),
};

const getRecipesByLanguage = (language = 'en') => {
    if (!(language in translates)) return [];
    return prepareItems(translates[language])
};

export const getRecipes = (free = false, language = 'en') => filterByFree(getRecipesByLanguage(language), free)
export const getRecipesByAuthor = (authorId, language = 'en', free = false) => {
    const items = getRecipesByLanguage(language);
    return items.filter(item => item.author?.id === authorId);
};

