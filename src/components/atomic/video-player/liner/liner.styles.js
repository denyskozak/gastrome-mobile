import { StyleSheet } from 'react-native';
import { Colors } from '../../../../styles/colors';
import { Spaces } from '../../../../styles/spaces';
import { BorderRadius } from '../../../../styles/borderRadiuses';

const styles = StyleSheet.create({
  line: {
    height: Spaces.xsmall + Spaces.xxsmall,
    backgroundColor: Colors.red,
    borderTopRightRadius: BorderRadius.small,
    borderBottomRightRadius: BorderRadius.small,
    borderRightWidth: Spaces.xsmall + Spaces.xxsmall,
  },
});

export default styles;
