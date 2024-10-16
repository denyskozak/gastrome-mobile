import { StyleSheet } from 'react-native';
import { getPercentHeight, getPercentWidth, getTextStyles } from '../../../../styles/common.styles';
import { fontEnum } from '../../../../styles/fonts';
import { Spaces } from '../../../../styles/spaces';
import { Colors } from '../../../../styles/colors';

const styles = StyleSheet.create({
  activeCooking: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: Spaces.xlarge,
    alignSelf: 'center',
    // width: '40%',
    zIndex: 2,
  },
  animationBackground: {
    padding: Spaces.small,
    backgroundColor: Colors.second,
    borderRadius: 100,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  // Voice assistant
  button: {
    width: '100%',
    height: Spaces.xxlarge + Spaces.small,
    borderRadius: 0,
  },
  buttonText: getTextStyles({
    fontSize: 24,
    color: Colors.white,
    justifyContent: 'center',
  }),
});

export default styles;
