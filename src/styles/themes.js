export const themes = {
  midnight: {
    id: 'midnight',
    label: 'Midnight',
    colors: {
      primary: '#FFB800',
      black: '#000000',
      second: '#000000',
      white: '#FFFFFF',
      red: '#BC7558',
      backgroundColor: '#000000',
      backgroundColorLowOpacity: '#000000',
      grey: '#BAA79D',
    },
  },
  latte: {
    id: 'latte',
    label: 'Latte',
    colors: {
      primary: '#BC9A75',
      black: '#32231A',
      second: '#FBECE9',
      white: '#FFFFFF',
      red: '#BC7558',
      backgroundColor: '#ae9f8c',
      backgroundColorLowOpacity: '#ae9f8c99',
      grey: '#D8C9C0',
    },
  },
  forest: {
    id: 'forest',
    label: 'Forest',
    colors: {
      primary: '#7FB069',
      black: '#1F1F1F',
      second: '#F5F5F5',
      white: '#FFFFFF',
      red: '#C75C5C',
      backgroundColor: '#1D2A24',
      backgroundColorLowOpacity: '#1D2A2488',
      grey: '#7D8D85',
    },
  },
};

export const defaultThemeId = 'midnight';

export const getThemeById = (id = defaultThemeId) => themes[id] || themes[defaultThemeId];
