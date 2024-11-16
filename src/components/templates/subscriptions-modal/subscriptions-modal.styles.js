import { StyleSheet } from 'react-native';
import { getTextStyles } from '../../../styles/common.styles';
import { Spaces } from '../../../styles/spaces';
import { Colors } from '../../../styles/colors';
import { fontEnum } from '../../../styles/fonts';

const styles = StyleSheet.create({
  title: getTextStyles({
    textAlign: 'center',
    color: Colors.white,
  }),
  benefitsText: getTextStyles({
    fontSize: 20,
    textAlign: 'center',
    color: Colors.white,

  }),
  benefits: {
    marginTop: Spaces.medium,
  },
  buttons: {
    alignItems: 'center',
    marginTop: Spaces.small,

  },
  button: {
    marginTop: Spaces.small,
    borderColor: Colors.white,
  },
  buttonText: getTextStyles({
    color: Colors.white,
  }),
  closeButton: {
    marginTop: Spaces.medium,
  },
  error: getTextStyles({
    marginTop: Spaces.medium,
    fontSize: 20,
    color: Colors.white,
  }),
  success: getTextStyles({
    marginTop: Spaces.medium,
    fontSize: 20,
    fontFamily: fontEnum.PoppinsSemiBold,
    color: Colors.white,
  })
});

export default styles;
