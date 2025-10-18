const levels = ['easy', 'medium'];

const createFilter = (filter = '') => (acc, item) => {
  const filters = Array.isArray(item.filters)
    && item.filters.map(filter => filter.toLocaleLowerCase());

  if (
      filters.includes(filter.toLocaleLowerCase()) // check by filter
      || levels.includes(filter) && item.level === filter // check on level
  ) {
    acc.push(item);
  }

  return acc;
};

export const filterRecipes = (items = [], filter = '') => {
  return [...items].reduce(createFilter(filter), []);
}