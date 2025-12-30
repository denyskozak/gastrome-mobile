import { StyleSheet } from 'react-native';
import { Spaces } from '../../../styles/spaces';
import { getTextStyles } from '../../../styles/common.styles';
export const useStyles = (theme) => StyleSheet.create({
  helpModalTitle: getTextStyles({
    marginTop: Spaces.medium,
    fontSize: 18,
    textAlign: 'center',
    color: theme.colors.white
  }),

  helpModalButton: {
    marginTop: Spaces.medium,
    color: theme.colors.white,
    borderColor: theme.colors.white,
  },
});
