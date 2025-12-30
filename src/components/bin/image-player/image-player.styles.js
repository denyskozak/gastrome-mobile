import { StyleSheet } from 'react-native';
import { getTextStyles } from '../../../styles/common.styles';
import { BorderRadius } from '../../../styles/borderRadiuses';

export const useStyles = (theme) => StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.backgroundColor,
  },
  rounded: {
    borderRadius: BorderRadius.small,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loading: {
    position: 'absolute',
    zIndex: 2,
  },
  errorText: getTextStyles({
    fontSize: 16
  }),
});
