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
      backgroundColorLowOpacity: '#000000CC',
      grey: '#BAA79D',
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
      backgroundColorLowOpacity: '#1D2A24CC',
      grey: '#7D8D85',
    },
  },

  obsidian: {
    id: 'obsidian',
    label: 'Obsidian',
    colors: {
      primary: '#4DA3FF',
      black: '#0B0F14',
      second: '#101621',
      white: '#FFFFFF',
      red: '#E06C75',
      backgroundColor: '#0B0F14',
      backgroundColorLowOpacity: '#0B0F14CC',
      grey: '#6B7280',
    },
  },

  ember: {
    id: 'ember',
    label: 'Ember',
    colors: {
      primary: '#FF8C42',
      black: '#1A0F0A',
      second: '#24140D',
      white: '#FFFFFF',
      red: '#E0573E',
      backgroundColor: '#1A0F0A',
      backgroundColorLowOpacity: '#1A0F0ACC',
      grey: '#9A7B6A',
    },
  },
};

export const defaultThemeId = 'midnight';

export const getThemeById = (id = defaultThemeId) =>
    themes[id] || themes[defaultThemeId];
