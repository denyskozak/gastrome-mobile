import { StyleSheet } from 'react-native';
import { createThemedStyles } from '../../styles/useThemedStyles';
import { getTextStyles } from '../../styles/common.styles';
import { Spaces } from '../../styles/spaces';

export const useCommonModalStyles = createThemedStyles((theme) => StyleSheet.create({
  container: {
    marginTop: Spaces.medium,
    marginBottom: Spaces.medium,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: Spaces.small,
  },
  button: {
    marginTop: Spaces.large,
    borderColor: theme.colors.white,
  },
  title: getTextStyles({
    fontSize: 22,
    textAlign: 'center',
    color: theme.colors.white,
  }, theme),
  text: getTextStyles({
    marginTop: Spaces.small,
    fontSize: 16,
    textAlign: 'center',
    color: theme.colors.white,
  }, theme),
  buttonText: getTextStyles({
    fontSize: 18,
    color: theme.colors.white,
  }, theme),
}));
