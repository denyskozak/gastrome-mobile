import { StyleSheet } from 'react-native';
import { getTextStyles } from '../../../styles/common.styles';
import { Spaces } from '../../../styles/spaces';
import { BorderRadius } from '../../../styles/borderRadiuses';

const styles = StyleSheet.create({
  title: getTextStyles({
    textAlign: 'center'
  }),
  video: {
    marginTop: Spaces.medium,
    height: Spaces.xxxlarge * 6,
    width: '100%',
    borderRadius: BorderRadius.small
  },
  button: {
    marginTop: Spaces.medium,
  }
});

export default styles;
