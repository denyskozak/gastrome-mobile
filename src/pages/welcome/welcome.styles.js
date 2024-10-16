import { StyleSheet } from 'react-native';
import { containerMarginTop, getPercentHeight, getPercentWidth, getTextStyles } from '../../styles/common.styles';
import { fontEnum } from '../../styles/fonts';
import { Spaces } from '../../styles/spaces';
import { Colors } from '../../styles/colors';

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: 'center',
    height: getPercentHeight(100),
    width: getPercentWidth(100),
    position: 'relative'
  },
  pageContent: {
    height: '100%',
    width: '100%',
    marginTop: Spaces.xxlarge,
  },
  text: {
    position: 'absolute',
    top: getPercentHeight(20),
    left: 0,
    padding: Spaces.medium,
    zIndex: 2,
  },
  title: getTextStyles({
      fontSize: 30,
      fontWeight: '300',
      fontFamily: fontEnum.PoppinsExtraBold,
     color: Colors.second
    }),
  subTitle: getTextStyles({
    marginTop: Spaces.small,
    fontSize: 18,
    fontWeight: '200',
    color: Colors.second
  }),
  video: {
    height: '100%',
    width: getPercentHeight(100),
  },
  videoLayer: {
    height: '100%',
    width: getPercentHeight(100),
    backgroundColor: Colors.black,
    opacity: 0.3,
    position: 'absolute',
    zIndex: 1
  },
  letGoButtonText: getTextStyles({
    fontSize: 24,
    color: Colors.second
  }),
  letGoButton: {
    borderColor: Colors.second,
  },
  scrollDown: {
    position: 'absolute',
    bottom: '12%',
    zIndex: 2,
  },
  scrollDownButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollDownText: getTextStyles({
    fontSize: 18,
    color: Colors.second,
    fontWeight: '200',
  }),
  letGoButtonContainer: {
    marginTop: Spaces.medium,
    width: Spaces.xxxlarge * 2 + Spaces.small,
  },

  // modal
  modalTitle: getTextStyles({
    marginTop: Spaces.large,
    fontFamily: fontEnum.PoppinsMedium,
    fontSize: 24,
    textAlign: 'center',
  }),
  modalText: getTextStyles({
    marginTop: Spaces.large,
    fontSize: 18,
    textAlign: 'center',
  }),
  modalButton: {
    marginTop: Spaces.medium,
  },
});

export default styles;
