
import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/colors';
import { Spaces } from '../../../styles/spaces';
import { getTextStyles } from '../../../styles/common.styles';

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.backgroundColorLowOpacity,
    paddingLeft: Spaces.small,
    paddingRight: Spaces.small,
    height: Spaces.xxlarge,
  },
  buttonText:  getTextStyles({
    fontSize: 18
  })
});

export default styles;
