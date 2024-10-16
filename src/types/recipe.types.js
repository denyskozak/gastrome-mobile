import PropTypes from 'prop-types';

const ingredient = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
});

const recipe = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredient).isRequired
});

const recipes = PropTypes.arrayOf(recipe);

export const RecipeTypes = {
  ingredient,
  recipe,
  recipes,
};
