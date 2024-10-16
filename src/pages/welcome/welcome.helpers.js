const images = [
  require('./images/bg-1.gif'),
];

export const getBackground = () => {
  const max = images.length;
  const random = Math.round(Math.random() * (max  - 1) + 1);
  return images[random - 1];
};
