import { StyleSheet } from 'react-native';
import { Spaces } from '../../../styles/spaces';
export const useStyles = (theme) => StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '12%',
    right: '2%',
    borderRadius: 50,
    backgroundColor: theme.colors.backgroundColor,
  },
});
