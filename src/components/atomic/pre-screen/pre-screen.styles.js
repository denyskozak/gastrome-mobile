import { StyleSheet } from 'react-native';
export const useStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundColor,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    width: 160,
    height: 160,
  },
});
