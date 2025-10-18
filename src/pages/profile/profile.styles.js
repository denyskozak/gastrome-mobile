import { StyleSheet } from 'react-native';
import { createThemedStyles } from '../../styles/useThemedStyles';
import { containerMarginTop, getTextStyles } from '../../styles/common.styles';
import { Spaces } from '../../styles/spaces';
import { BorderRadius as FontSizes } from '../../styles/borderRadiuses';

export const useProfileStyles = createThemedStyles((theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: containerMarginTop,
    alignItems: 'center',
  },
  subscriptions: {
    marginTop: Spaces.large,
  },
  subscriptionText: getTextStyles({}, theme),
  settingButtons: {
    marginTop: Spaces.large,
    gap: Spaces.small,
  },
  settingButton: {
    borderColor: theme.colors.primary,
  },
  comingSoon: getTextStyles({
    fontSize: 14,
    marginTop: Spaces.xxlarge,
  }, theme),
  footer: {
    position: 'absolute',
    bottom: Spaces.medium,
    gap: Spaces.small,
  },
  footerText: getTextStyles({
    fontSize: FontSizes.medium,
    textAlign: 'center',
  }, theme),
  languages: {
    flexDirection: 'row',
    gap: Spaces.medium,
    marginTop: Spaces.medium,
  },
  themePicker: {
    marginTop: Spaces.large,
    width: '100%',
    paddingHorizontal: Spaces.large,
    gap: Spaces.small,
  },
  themePickerTitle: getTextStyles({
    fontSize: 18,
    textAlign: 'center',
  }, theme),
  themeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spaces.small,
    justifyContent: 'center',
  },
}));
