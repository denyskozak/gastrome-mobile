import { StyleSheet } from 'react-native';
import { Spaces } from '../../../../styles/spaces';
import { BorderRadius } from '../../../../styles/borderRadiuses';

export const useStyles = (theme) => StyleSheet.create({
  line: {
    height: Spaces.xsmall + Spaces.xxsmall,
    backgroundColor: theme.colors.white,
    borderTopRightRadius: BorderRadius.small,
    borderBottomRightRadius: BorderRadius.small,
    borderRightWidth: Spaces.xsmall + Spaces.xxsmall,
  },
});
