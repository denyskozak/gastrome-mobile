import { StyleSheet } from 'react-native';
import { getTextStyles } from '../../../styles/common.styles';
import { Spaces } from '../../../styles/spaces';
import { fontEnum } from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    marginTop: Spaces.medium,
    gap: Spaces.medium,
  },
  item: {
    gap: Spaces.small,
  },
  question: getTextStyles({
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fontEnum.PoppinsSemiBold
  }),
  answer: getTextStyles({
    textAlign: 'center'
  }),
});

export default styles;
