import { StyleSheet } from 'react-native';
import { Spaces } from '../../../styles/spaces';
export const useStyles = (theme) => StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '12%',
    right: '2%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundColor,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    width: Spaces.xxlarge + Spaces.large,
    height: Spaces.xxlarge + Spaces.large,
  },
});
