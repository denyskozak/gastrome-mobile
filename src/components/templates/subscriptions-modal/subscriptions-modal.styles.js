import { StyleSheet } from 'react-native';
import { getTextStyles } from '../../../styles/common.styles';
import { Spaces } from '../../../styles/spaces';
import { Colors } from '../../../styles/colors';
import { fontEnum } from '../../../styles/fonts';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    paddingHorizontal: Spaces.large,
    paddingVertical: Spaces.xxlarge,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spaces.large,
  },
  content: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  title: getTextStyles({
    fontSize: 32,
    fontFamily: fontEnum.PoppinsSemiBold,
    textAlign: 'center',
    color: Colors.white,
  }),
  benefitsText: getTextStyles({
    fontSize: 20,
    textAlign: 'center',
    color: Colors.white,
    marginTop: Spaces.small,
  }),
  firstBenefitText: {
    marginTop: 0,
  },
  benefits: {
    marginTop: Spaces.medium,
    alignSelf: 'stretch',
  },
  buttons: {
    marginTop: Spaces.large,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'stretch',
    borderColor: Colors.white,
  },
  buttonText: getTextStyles({
    color: Colors.white,
    textAlign: 'center',
  }),
  logoWrapper: {
    marginTop: Spaces.large,
    marginBottom: Spaces.large,
    alignItems: 'center',
  },
  closeButtonWrapper: {
    alignItems: 'center',
    marginTop: Spaces.large,
    marginBottom: Spaces.medium,
  },
  closeButton: {
    borderColor: Colors.white,
    minWidth: 80,
  },
  closeButtonText: getTextStyles({
    color: Colors.white,
  }),
  error: getTextStyles({
    marginTop: Spaces.medium,
    fontSize: 20,
    textAlign: 'center',
    color: Colors.white,
  }),
  success: getTextStyles({
    marginTop: Spaces.medium,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fontEnum.PoppinsSemiBold,
    color: Colors.white,
  }),
});

export default styles;
