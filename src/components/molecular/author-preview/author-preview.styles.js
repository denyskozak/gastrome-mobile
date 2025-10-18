import { StyleSheet } from 'react-native';
import { getTextStyles } from '../../../styles/common.styles';
import { fontEnum } from '../../../styles/fonts';
import {Spaces} from "../../../styles/spaces";
import {BorderRadius} from "../../../styles/borderRadiuses";

const styles = StyleSheet.create({
  image: {
    height: Spaces.xxxlarge * 1.5,
    width: Spaces.xxxlarge * 1.5,
    marginTop: Spaces.large,
    alignSelf: 'center',
    borderRadius: BorderRadius.large
  },
  name: getTextStyles({
    marginTop: Spaces.small,
    alignItems: 'center',
    fontSize: 24,
    textAlign: 'center',
    paddingLeft: Spaces.medium,
    paddingRight: Spaces.medium,
    fontFamily: fontEnum.PoppinsSemiBold,
  }),
});

export default styles;
