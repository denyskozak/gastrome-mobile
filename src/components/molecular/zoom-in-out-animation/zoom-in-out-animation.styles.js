import { StyleSheet } from 'react-native';
import { BorderRadius } from '../../../styles/borderRadiuses';

const styles = StyleSheet.create({
  getImageWrapper: (width, height) => ({
    height,
    width,
    borderRadius: BorderRadius.small,
    overflow: 'hidden', // Clip content to this boundary

  })
});

export default styles;
