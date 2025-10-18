import { StyleSheet } from 'react-native';
import { getTextStyles } from '../../../styles/common.styles';
import { Spaces } from '../../../styles/spaces';
import { BorderRadius } from '../../../styles/borderRadiuses';
import {getDevice} from "../../../utilities/getCurrentDevice";
import {Colors} from "../../../styles/colors";

const styles = StyleSheet.create({
  title: getTextStyles({
    textAlign: 'center',
    color: Colors.white,
  }),
  video: {
    marginTop: Spaces.medium,
    height: Spaces.xxxlarge * 6,
    width: getDevice() === 'iPhone' ? '100%' : Spaces.xxxlarge * 5,
    borderRadius: BorderRadius.small
  },
  button: {
    marginTop: Spaces.medium,
    borderColor: Colors.white,
  }
});

export default styles;
