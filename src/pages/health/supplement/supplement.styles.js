import { getPercentHeight, getPercentWidth, getTextStyles } from '../../../styles/common.styles';
import { fontEnum } from '../../../styles/fonts';
import { StyleSheet } from 'react-native';
import { Spaces } from '../../../styles/spaces';
import { Colors } from '../../../styles/colors';
import {BorderRadius as FontSize, BorderRadius} from '../../../styles/borderRadiuses';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: Spaces.medium,
    justifyContent: "center",
    alignItems: 'center',
  },
  description: getTextStyles({
    marginTop: Spaces.medium,
    alignItems: 'center',
    fontSize: 18,
    textAlign: 'center',
    paddingLeft: Spaces.medium,
    paddingRight: Spaces.medium,
  }),
  benefit: getTextStyles({
    fontSize: 18,
  }),
  benefits: {
    height: getPercentHeight(30),
  },
  image: {
    height: Spaces.xxxlarge * 4,
    width: Spaces.xxxlarge * 5,
    marginTop: Spaces.large,
    alignSelf: 'center',
    borderRadius: BorderRadius.small
  },
  text: getTextStyles({
    fontSize: FontSize.medium,
  }),
});

export default styles;
