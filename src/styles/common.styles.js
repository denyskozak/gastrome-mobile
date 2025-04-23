import { fontEnum } from './fonts';
import { Dimensions } from 'react-native';
import { Colors } from './colors';

export const containerMarginTop = 10;
export const BorderRadius = {
  circle: 400 / 2,
};

const dimension = Dimensions.get('window');
export const getPercentWidth = (percent) => (percent / 100) * dimension.width;
export const getPercentHeight = (percent) => (percent / 100) * dimension.height;

export const getTextStyles = (
  options
) => {
  const defaultStyles = {
    fontSize: 18,
    fontFamily: fontEnum.PoppinsNormal,
    textDecorationLine: 'none',
    fontWeight: '400',
    color: Colors.white
  };

  return {
    ...defaultStyles,
    ...options,
  }
};
