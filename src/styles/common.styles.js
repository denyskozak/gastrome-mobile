import { fontEnum } from './fonts';
import { Dimensions } from 'react-native';
import { defaultThemeId, getThemeById } from './themes';

export const containerMarginTop = 10;
export const BorderRadius = {
  circle: 400 / 2,
};

const dimension = Dimensions.get('window');
export const getPercentWidth = (percent) => (percent / 100) * dimension.width;
export const getPercentHeight = (percent) => (percent / 100) * dimension.height;

let currentTheme = getThemeById(defaultThemeId);

export const setCommonStylesTheme = (theme) => {
  currentTheme = theme;
};

export const getTextStyles = (
  options = {},
  themeOverride = currentTheme
) => {
  const targetTheme = themeOverride ?? currentTheme;

  const defaultStyles = {
    fontSize: 18,
    fontFamily: fontEnum.PoppinsNormal,
    textDecorationLine: 'none',
    fontWeight: '400',
    color: targetTheme.colors.white
  };

  return {
    ...defaultStyles,
    ...options,
  }
};
