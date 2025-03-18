import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/colors';
import { getTextStyles } from '../../../styles/common.styles';
import { Spaces } from '../../../styles/spaces';
import { BorderRadius } from '../../../styles/borderRadiuses';

const styles = StyleSheet.create({
  container: {
    paddingLeft: Spaces.large,
    paddingRight: Spaces.large,
    height: Spaces.mxxlarge,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.small,
  },

  // Sizes:
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

  outlined: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: BorderRadius.small,
  },
  contained: {
    borderRadius: BorderRadius.small
  },
  fulled: {
  },
  wide: {
    width: '100%',
    height: Spaces.xxlarge + Spaces.small,
    borderRadius: 0,
  },
  wideText: getTextStyles({
    fontSize: 24,
    color: Colors.white,
    justifyContent: 'center',
  }),
  disabledContainer: {
    borderColor: Colors.grey,
  },

  selected: {
    backgroundColor: Colors.black,
    borderColor: Colors.black
  },
  text: getTextStyles({
    fontSize: 16,
  }),
  textContained: {
    color: Colors.second,
  },
  textFulled: {
    color: Colors.second,
  },
  textDisabled: {
    color: Colors.grey,
  },
  textSelected: {
    color: Colors.white,
  },
  highlight: {
    textDecorationLine: 'underline',
  },
});

export default styles;
