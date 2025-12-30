import { StyleSheet } from 'react-native';
import { Spaces } from '../../../styles/spaces';
import { getTextStyles } from '../../../styles/common.styles';
export const useStyles = (theme) => StyleSheet.create({
  helpModalTitle: getTextStyles({
    marginTop: Spaces.large,
    fontSize: 18,
    textAlign: 'center',
    color: theme.colors.white,
  }),

  helpModalButton: {
    marginTop: Spaces.medium,
    borderColor: theme.colors.white,
  },
});
