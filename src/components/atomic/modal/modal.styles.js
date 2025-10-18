import { StyleSheet } from 'react-native';
import { createThemedStyles } from '../../../styles/useThemedStyles';
import { Spaces } from '../../../styles/spaces';
import { BorderRadius } from '../../../styles/borderRadiuses';

export const useModalStyles = createThemedStyles((theme) => ({
  styles: StyleSheet.create({
    containerBase: {
      padding: Spaces.large,
      justifyContent: 'center',
      borderRadius: BorderRadius.medium,
      borderWidth: 1,
      borderColor: theme.colors.white,
      marginTop: Spaces.small,
      marginBottom: Spaces.small,
      alignItems: 'center',
    },
  }),
  getContainer: (isBlack) => ({
    backgroundColor: isBlack ? theme.colors.black : theme.colors.backgroundColor,
  }),
}));
