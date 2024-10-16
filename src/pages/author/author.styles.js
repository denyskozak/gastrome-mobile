import { getPercentHeight, getPercentWidth, getTextStyles } from '../../styles/common.styles';
import { fontEnum } from '../../styles/fonts';
import { StyleSheet } from 'react-native';
import { Spaces } from '../../styles/spaces';
import { Colors } from '../../styles/colors';
import { BorderRadius } from '../../styles/borderRadiuses';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: Spaces.medium,
  },
  description: getTextStyles({
    marginTop: Spaces.medium,
    alignItems: 'center',
    fontSize: 18,
    textAlign: 'center',
    paddingLeft: Spaces.medium,
    paddingRight: Spaces.medium,
  }),
  recipes: getTextStyles({
    marginTop: Spaces.medium,
    alignItems: 'center',
    fontSize: 16,
    textAlign: 'center',
    paddingLeft: Spaces.medium,
    paddingRight: Spaces.medium,
  }),
  list: {
    gap: Spaces.xlarge,
  },
});

export default styles;
