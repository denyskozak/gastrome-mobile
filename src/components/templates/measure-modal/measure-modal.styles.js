import { StyleSheet } from 'react-native';
import { Spaces } from '../../../styles/spaces';
import { getTextStyles } from '../../../styles/common.styles';
import { Colors } from '../../../styles/colors';

const styles = StyleSheet.create({
  title: getTextStyles({
    marginTop: Spaces.large,
    fontSize: 18,
    textAlign: 'center',
  }),
  button: {
    marginTop: Spaces.medium,
  },
});

export default styles;