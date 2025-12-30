import { StyleSheet } from 'react-native';
import { getTextStyles } from '../../../styles/common.styles';

const text = getTextStyles({
  fontSize: 24,
  fontWeight: '400',
  textDecorationLine: 'none',
});

export const useStyles = (theme) => StyleSheet.create({
  selectText: {
    ...text,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: theme.colors.black,
    borderRadius: 30,
    padding: 12,
  },
  selectContainer: {
    justifyContent: 'center',
  },
  text: text,
});

export const getAutocompleteColors = (theme) => ({
  primary: theme.colors.black,
  success: theme.colors.black,
  subItemBackground: theme.colors.backgroundColor,
  itemBackground: theme.colors.backgroundColor,
});
