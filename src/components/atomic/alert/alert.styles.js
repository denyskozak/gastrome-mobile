import { StyleSheet } from 'react-native';
import { Spaces } from '../../../styles/spaces';

export const useStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundColor,
    padding: Spaces.large,
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: Spaces.small,
    marginBottom: Spaces.small,
    alignItems: 'center',
  }
});
