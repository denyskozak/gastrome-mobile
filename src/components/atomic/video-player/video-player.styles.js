import { StyleSheet } from 'react-native';
import { containerMarginTop, getTextStyles } from '../../../styles/common.styles';
import { Spaces } from '../../../styles/spaces';

export const useStyles = (theme) => StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.backgroundColor,
  },
  loading: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: getTextStyles({
    fontSize: 16
  }),
  loadingText: getTextStyles({
    fontSize: 18
  }),
  time: {
    position: 'absolute',
    left: 0
  }
});
