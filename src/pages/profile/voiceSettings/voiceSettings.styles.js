import { StyleSheet } from 'react-native';
import { containerMarginTop, getPercentWidth, getTextStyles } from '../../../styles/common.styles';
import { Spaces } from '../../../styles/spaces';
import { BorderRadius } from '../../../styles/borderRadiuses';
import { Colors } from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    marginTop: containerMarginTop,
    alignItems: "center",
  },
  content: {
    paddingBottom: Spaces.mxxlarge * 2,
  },
  text: getTextStyles({
    marginTop: Spaces.medium
  }),
  assistantButton: {
    marginTop: Spaces.medium
  },
  selected: {

  },

  // Confirm button
  confirmButtonBackground: {
    position: 'absolute',
    bottom: 0,
    left: '25%',
    transform: [{translateX: -25}],
    width: getPercentWidth(60),
    height: 80,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderRadius: BorderRadius.medium,
    // padding: Spaces.large,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    width: getPercentWidth(50),
    shadowColor: Colors.primary,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { height: 1}
  },
  confirmText: getTextStyles({ color: Colors.white }),
});

export default styles;
