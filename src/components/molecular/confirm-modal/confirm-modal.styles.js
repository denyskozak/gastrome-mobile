import { StyleSheet } from 'react-native';
import { Spaces } from '../../../styles/spaces';
import { getTextStyles } from '../../../styles/common.styles';
export const useStyles = (theme) => StyleSheet.create({
  // Voice assistant modal
  title: getTextStyles({
    marginTop: Spaces.small,
    fontSize: 20,
    color: theme.colors.white
  }),
  text: getTextStyles({
    marginTop: Spaces.small,
    fontSize: 16,
    color: theme.colors.white
  }),
  buttons: {
    flexDirection: 'row',
    gap: Spaces.medium,
    marginTop: Spaces.medium,
  },
  button: {
    borderColor: theme.colors.white
  },
  buttonText: getTextStyles({
    color: theme.colors.white
  }),
});
