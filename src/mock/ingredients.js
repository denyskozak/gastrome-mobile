import { getRecipes } from './languages';

export const getIngredientsMock = (free = false, language = 'en') => {
  const uniqueTitles = [];

  return getRecipes(free, language)
    .reduce((acc = [], recipe) => {

      recipe.ingredients.forEach((item) => {
        if (!uniqueTitles.includes(item.title)) {
          acc.push(item);
          uniqueTitles.push(item.title);
        }
      });

      return acc;
    }, []);
};
