import { StyleSheet } from 'react-native';
import { getTextStyles } from '../../../styles/common.styles';
import { Spaces } from '../../../styles/spaces';
import { BorderRadius } from '../../../styles/borderRadiuses';
import {getDevice} from "../../../utilities/getCurrentDevice";

const styles = StyleSheet.create({
  title: getTextStyles({
    textAlign: 'center'
  }),
  video: {
    marginTop: Spaces.medium,
    height: Spaces.xxxlarge * 6,
    width: getDevice() === 'iPhone' ? '100%' : Spaces.xxxlarge * 5,
    borderRadius: BorderRadius.small
  },
  button: {
    marginTop: Spaces.medium,
  }
});

export default styles;
