
import { StyleSheet } from 'react-native';
import { Spaces } from '../../../styles/spaces';
import { getTextStyles } from '../../../styles/common.styles';

export const useStyles = (theme) => StyleSheet.create({
  button: {
    backgroundColor: theme.colors.backgroundColorLowOpacity,
    paddingLeft: Spaces.small,
    paddingRight: Spaces.small,
    height: Spaces.xxlarge,
  },
  buttonText:  getTextStyles({
    fontSize: 18
  })
});
