import { StyleSheet } from 'react-native';
import {getTextStyles} from '../../../styles/common.styles';
import { Colors } from '../../../styles/colors';
import { Spaces } from '../../../styles/spaces';
import {BorderRadius} from "../../../styles/borderRadiuses";

const styles = StyleSheet.create({
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
    color: Colors.primary,
    textAlign: 'center',
    // borderWidth: 1,
    // borderColor: Colors.primary,
    // borderRadius: BorderRadius.medium,
  })
});

export default styles;
