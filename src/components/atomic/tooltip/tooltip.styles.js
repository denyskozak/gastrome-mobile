import { StyleSheet } from 'react-native';
import {getTextStyles} from '../../../styles/common.styles';
import { Spaces } from '../../../styles/spaces';
import {BorderRadius} from "../../../styles/borderRadiuses";

export const useStyles = (theme) => StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    left: 0,
    zIndex: 2,
  },
  popover: {
    width: 200,

  },
  text: getTextStyles({
    fontSize: 18,
    padding: Spaces.small,
    color: theme.colors.primary,
    textAlign: 'center',
    borderRadius: BorderRadius.medium,
  })
});
