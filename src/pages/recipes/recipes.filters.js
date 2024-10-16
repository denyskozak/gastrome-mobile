const createFilter = (filter = '') => (acc, item) => {
  const filters = Array.isArray(item.filters)
    && item.filters.map(filter => filter.toLocaleLowerCase());

  if (filters.includes(filter.toLocaleLowerCase())) {
    acc.push(item);
  }

  return acc;
};

export const filterRecipes = (items = [], filter = '') => {
  return [...items].reduce(createFilter(filter), []);
}