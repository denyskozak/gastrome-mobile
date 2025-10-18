import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/colors';
import { getTextStyles } from '../../../styles/common.styles';
import { BorderRadius } from '../../../styles/borderRadiuses';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundColor,
  },
  rounded: {
    borderRadius: BorderRadius.small,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loading: {
    position: 'absolute',
    zIndex: 2,
  },
  errorText: getTextStyles({
    fontSize: 16
  }),
});

export default styles;
