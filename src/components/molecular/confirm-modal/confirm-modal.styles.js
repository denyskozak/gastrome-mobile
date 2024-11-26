import { StyleSheet } from 'react-native';
import { Spaces } from '../../../styles/spaces';
import { getTextStyles } from '../../../styles/common.styles';
import {Colors} from "../../../styles/colors";
const styles = StyleSheet.create({
  // Voice assistant modal
  title: getTextStyles({
    marginTop: Spaces.small,
    fontSize: 20,
    color: Colors.white
  }),
  text: getTextStyles({
    marginTop: Spaces.small,
    fontSize: 16,
    color: Colors.white
  }),
  buttons: {
    flexDirection: 'row',
    gap: Spaces.medium,
    marginTop: Spaces.medium,
  },
  button: {
    borderColor: Colors.white
  },
  buttonText: getTextStyles({
    color: Colors.white
  }),
});

export default styles;
