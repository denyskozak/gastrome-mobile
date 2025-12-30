import { StyleSheet } from 'react-native';
import { BorderRadius, getTextStyles } from '../../../styles/common.styles';
import { fontEnum } from '../../../styles/fonts';
export const useStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundColorLowOpacity,
    borderRadius: BorderRadius.circle,
  },
  countText: getTextStyles({
    fontSize: 14,
    fontFamily: fontEnum.PoppinsSemiBold,
    padding: 10
  }),
});
