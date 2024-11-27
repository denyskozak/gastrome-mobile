import { StyleSheet } from 'react-native';
import { containerMarginTop, getTextStyles } from '../../styles/common.styles';
import { Spaces } from '../../styles/spaces';
import { Colors } from '../../styles/colors';
import {BorderRadius as FontSizes} from "../../styles/borderRadiuses";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: containerMarginTop,
    alignItems: "center",
  },
  subscriptions: {
    marginTop: Spaces.large,
  },
  subscriptionText: getTextStyles(),
  settingButtons: {
    marginTop: Spaces.large,
    gap: Spaces.small
  },
  settingButton: {
    borderColor: Colors.primary,
  },
  comingSoon: getTextStyles({
    fontSize: 14,
    marginTop: Spaces.xxlarge
  }),
  footer: {
    position: 'absolute',
    bottom: Spaces.medium,
    gap: Spaces.small,
  },
  footerText: getTextStyles({
    fontSize: FontSizes.medium,
    textAlign: 'center',
  }),
  languages: {
    flexDirection: 'row',
    gap: Spaces.medium,
    marginTop: Spaces.medium
  }
});

export default styles;
