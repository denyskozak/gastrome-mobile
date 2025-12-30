import { StyleSheet } from 'react-native';
import { getPercentWidth, getTextStyles } from '../../../styles/common.styles';
import { Spaces } from '../../../styles/spaces';

export const useStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.second,
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
    fontSize: 24
  }),
  subTitle: getTextStyles({
    fontSize: 20,
    transform: [{translateY: -Spaces.xlarge}],
    width: getPercentWidth(80)
  }),
});
