import { containerMarginTop, getPercentHeight, getPercentWidth, getTextStyles } from '../../../styles/common.styles';

import { StyleSheet } from 'react-native';
import { Spaces } from '../../../styles/spaces';
import { Colors } from '../../../styles/colors';
import { BorderRadius } from '../../../styles/borderRadiuses';
import { fontEnum } from '../../../styles/fonts';
import { getDevice } from '../../../utilities/getCurrentDevice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: getDevice() === 'iPad' ? '80%' : '100%',
    alignItems: 'center',
  },
  liner: {
    position: 'absolute',
    bottom:  Spaces.xxlarge + Spaces.small,
    left: 0,
    zIndex: 3
  },
  video: { width: '100%', height: '100%'},
  backButtonContainer: {
    position: 'absolute',
    zIndex: 2,
    left:  getDevice() === 'iPad' ? '10%' : '5%',
    bottom: Spaces.xxxlarge,
    flexDirection: 'row',
    gap: Spaces.small,
  },
  backPause: {
    position: 'absolute',
    bottom: '20%',
  },
  backButton: {
    backgroundColor: Colors.backgroundColorLowOpacity,
  },
  backButtonText: getTextStyles({
    fontSize: 18,
    color: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }),
  timerButton: {
    position: 'absolute',
    zIndex: 2,
    left:  getDevice() === 'iPad' ? '10%' : '2%',
    bottom: Spaces.xxxlarge,
  },
  textContainer: {
    position: 'absolute',
    top: getDevice() === 'iPad' ? Spaces.xxlarge + Spaces.xlarge : Spaces.xxlarge,
    width: getDevice() === 'iPad' ? '80%' : '90%',
    borderWidth: 1,
    borderRadius: BorderRadius.small,
    padding: Spaces.small,
    borderColor: Colors.black,
    backgroundColor: Colors.backgroundColorLowOpacity
  },
  textBackIcon: {
    zIndex: 2,
    position: 'absolute',
    padding: Spaces.small,
    left: 0,
    top: 0,
  },
  textHideIcon: {
    zIndex: 2,
    position: 'absolute',
    padding: Spaces.small,
    right: 0,
    top: 0,
  },
  authorContainer: {
    borderRadius: BorderRadius.small,
    backgroundColor: Colors.backgroundColorLowOpacity,
    padding: Spaces.small,
    position: 'absolute',
    bottom: Spaces.xxxlarge + Spaces.xxxlarge,
  },
  author: getTextStyles({
    fontSize: 12,
  }),
  helpArrow: {
    position: 'absolute',
    bottom: '20%',
    opacity: 1
    // left: '40%'
  },
  step: getTextStyles({
    fontSize: 18,
    color: Colors.black,
    textAlign: 'center',
    // maxHeight: Spaces.xxxlarge + Spaces.xxlarge,
  }),
  text: getTextStyles({
    marginTop: Spaces.small,
    fontSize: 18,
    color: Colors.black,
    textAlign: 'center',
    // maxHeight: Spaces.xxxlarge + Spaces.xxlarge,
  }),
});

export default styles;
