import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/colors';
import { getPercentWidth, getTextStyles } from '../../../styles/common.styles';
import { Spaces } from '../../../styles/spaces';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.second,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Spaces.xxxlarge * 2,
    height: Spaces.xxxlarge * 2,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250
  },
  logo: {
    position: 'absolute',
    top: 0,
    transform: [{translateY: -(Spaces.xxxlarge + Spaces.xlarge)}]
  },
  title: getTextStyles({
    transform: [{translateY: -Spaces.xlarge}],
  }),
  subTitle: getTextStyles({
    fontSize: 14,
    transform: [{translateY: -Spaces.xlarge}],
    width: getPercentWidth(80)
  }),
});

export default styles;
