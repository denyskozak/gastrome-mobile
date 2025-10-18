// For search by ingredients
export const getTitle = item => String(item.title).toLocaleLowerCase();
const getIngredientsList = item => item.ingredients.map(getTitle);
const createIngredientsFilter = itemIngredients => ingredient => itemIngredients.includes(ingredient);
const createAddFoundIngredients = ingredients => item =>
  ({
    ...item,
    selectedIngredients: ingredients.filter(createIngredientsFilter(getIngredientsList(item)))
  });

export const filterRecipesByIngredientsList = (items, ingredients) => items
  // Adding selectedIngredients field pared to selectedIngredients
  .map(createAddFoundIngredients(ingredients))
  // Remove all recipes with no matched ingredients
  .filter(item => item.selectedIngredients.length > 0)
  // Sort by selectedIngredients count
  .sort((a, b) => a.selectedIngredients.length - b.selectedIngredients.length)
  .reverse();
