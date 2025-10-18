export const sortIngredients = (a, b) => {
  const nameA = a.title.toUpperCase(); // ignore upper and lowercase
  const nameB = b.title.toUpperCase(); // ignore upper and lowercase

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
};
