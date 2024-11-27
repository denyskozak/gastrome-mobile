import { StyleSheet } from 'react-native';
import { getTextStyles } from '../../../styles/common.styles';
import { Spaces } from '../../../styles/spaces';
import { Colors } from '../../../styles/colors';

const styles = StyleSheet.create({
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
    borderColor: Colors.primary,
  },
});

export default styles;
