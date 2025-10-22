import { StyleSheet } from 'react-native';
import { createThemedStyles } from '../../../styles/useThemedStyles';
import { getTextStyles } from '../../../styles/common.styles';
import { Spaces } from '../../../styles/spaces';
import { BorderRadius } from '../../../styles/borderRadiuses';

export const useButtonStyles = createThemedStyles((theme) => StyleSheet.create({
  container: {
    paddingLeft: Spaces.large,
    paddingRight: Spaces.large,
    height: Spaces.mxxlarge,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: BorderRadius.small,
  },

  containerS: {
    paddingLeft: Spaces.small,
    paddingRight: Spaces.small,
    height: Spaces.xxlarge,
    width: Spaces.xxlarge,
  },
  containerM: {
    paddingLeft: Spaces.small,
    paddingRight: Spaces.small,
    height: Spaces.xxlarge,
    width: Spaces.xxlarge * 2,
  },
  containerL: {
    paddingLeft: Spaces.small,
    paddingRight: Spaces.small,
    height: Spaces.xxlarge,
    width: Spaces.xxlarge * 4,
  },
  containerXL: {
    paddingLeft: Spaces.small,
    paddingRight: Spaces.small,
    height: Spaces.xxlarge,
    width: Spaces.xxxlarge * 3,
  },
  containerXXL: {
    paddingLeft: Spaces.small,
    paddingRight: Spaces.small,
    height: Spaces.xxlarge,
    width: Spaces.xxxlarge * 4,
  },

  outlined: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: BorderRadius.small,
  },
  contained: {
    borderRadius: BorderRadius.small,
    backgroundColor: theme.colors.primary,
  },
  fulled: {},
  wide: {
    width: '100%',
    height: Spaces.xxlarge + Spaces.small,
    borderRadius: 0,
  },
  wideText: getTextStyles({
    fontSize: 24,
    color: theme.colors.white,
    justifyContent: 'center',
  }, theme),
  disabledContainer: {
    borderColor: theme.colors.grey,
    backgroundColor: `${theme.colors.primary}33`,
  },

  selected: {
    backgroundColor: theme.colors.black,
    borderColor: theme.colors.primary,
  },
  text: getTextStyles({
    fontSize: 16,
    color: theme.colors.black,
  }, theme),
  textContained: {
    color: theme.colors.second,
  },
  textOutlined: {
    color: theme.colors.white,
  },
  textFulled: {
    color: theme.colors.second,
  },
  textDisabled: {
    color: theme.colors.grey,
  },
  textSelected: {
    color: theme.colors.white,
  },
  highlight: {
    textDecorationLine: 'underline',
  },
}));
