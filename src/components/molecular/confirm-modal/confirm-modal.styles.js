import { StyleSheet } from 'react-native';
import { Spaces } from '../../../styles/spaces';
import { getTextStyles } from '../../../styles/common.styles';
const styles = StyleSheet.create({
  // Voice assistant modal
  title: getTextStyles({
    marginTop: Spaces.small,
    fontSize: 20,
  }),
  text: getTextStyles({
    marginTop: Spaces.small,
    fontSize: 16,
  }),
  buttons: {
    flexDirection: 'row',
    gap: Spaces.medium,
    marginTop: Spaces.medium,
  },
  button: {
  },
});

export default styles;
