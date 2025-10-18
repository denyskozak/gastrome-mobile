import { StyleSheet } from 'react-native';
import { BorderRadius, getTextStyles } from '../../../styles/common.styles';
import { fontEnum } from '../../../styles/fonts';
import { Colors } from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColorLowOpacity,
    borderRadius: BorderRadius.circle,
  },
  countText: getTextStyles({
    fontSize: 14,
    fontFamily: fontEnum.PoppinsSemiBold,
    padding: 10
  }),
});

export default styles;
