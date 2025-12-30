import { StyleSheet } from 'react-native';
import { getTextStyles } from '../../../styles/common.styles';
import { Spaces } from '../../../styles/spaces';
export const useStyles = (theme) => StyleSheet.create({
  subscriptions: {
    marginTop: Spaces.large,
    gap: Spaces.large,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscriptionText: getTextStyles({
    textAlign: 'center'
  }),
  communityText: getTextStyles({
    textAlign: 'center',
    fontSize: 22
  }),
  howToCancelButton: {
    width: Spaces.xxxlarge  * 4,
  },
  settingButton: {
    borderColor: theme.colors.primary,
  },
});
