import { StyleSheet } from 'react-native';
import { Spaces } from '../../styles/spaces';
import { BorderRadius, getTextStyles } from '../../styles/common.styles';
import { fontEnum } from '../../styles/fonts';

export const useStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  timer: {
    position: 'absolute',
    bottom: '50%',
    alignSelf: 'center',
    zIndex: 2,
  },
  helpModal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpModalTitle: getTextStyles({
    marginTop: Spaces.small,
    fontSize: 18,
    textAlign: 'center',
    color: theme.colors.white
  }),
  helpModalButton: {
    marginTop: Spaces.medium,
  },
});
