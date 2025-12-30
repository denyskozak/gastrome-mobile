import { StyleSheet } from 'react-native';
import { getPercentHeight, getPercentWidth, getTextStyles } from '../../../../styles/common.styles';
import { fontEnum } from '../../../../styles/fonts';
import { Spaces } from '../../../../styles/spaces';
import {getDevice} from "../../../../utilities/getCurrentDevice";

export const useStyles = (theme) => StyleSheet.create({
  getActiveCooking: (isUpper = false) => ({
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: getDevice() === 'iPad' ? Spaces.xxxlarge + Spaces.medium  : isUpper ? Spaces.xxxlarge : Spaces.xlarge,
    alignSelf: 'center',
    // width: '40%',
    zIndex: 1000,
  }),
  animationBackground: {
    padding: Spaces.small,
    backgroundColor: theme.colors.second,
    borderRadius: 100,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },

  animationOffBackground: {
    // padding: Spaces.xxsmall,
    backgroundColor: theme.colors.second,
    borderRadius: 100,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  // Voice assistant
  button: {
    backgroundColor: theme.colors.primary,
  },
  buttonText: getTextStyles({
    fontSize: 24,
    color: theme.colors.black,
    justifyContent: 'center',
  }),
});
