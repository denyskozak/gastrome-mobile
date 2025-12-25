import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/colors';
import { getTextStyles } from '../../../styles/common.styles';
import { fontEnum } from '../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    position: 'absolute',
    width: '100%',
    top: 0,
    gap: 8,
    zIndex: 1,
  },
  title: getTextStyles({
    fontSize: 32,
    fontFamily: fontEnum.PoppinsSemiBold
  }),
  by: {
    position: 'absolute',
    bottom: '10%',
    fontSize: 18,
    textDecorationLine: 'none',
    fontWeight: '300',
    color: Colors.black
  },
});

export default styles;
