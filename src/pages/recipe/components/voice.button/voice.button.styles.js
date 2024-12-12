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
    zIndex: 1000,
  },
  animationBackground: {
    padding: Spaces.small,
    backgroundColor: Colors.second,
    borderRadius: 100,
    borderColor: Colors.primary,
    borderWidth: 2,
  },

  animationOffBackground: {
    // padding: Spaces.xxsmall,
    backgroundColor: Colors.second,
    borderRadius: 100,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  // Voice assistant
  button: {
    backgroundColor: Colors.primary,
  },
  buttonText: getTextStyles({
    fontSize: 24,
    color: Colors.black,
    justifyContent: 'center',
  }),
});

export default styles;
