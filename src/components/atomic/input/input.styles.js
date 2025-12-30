import { StyleSheet } from 'react-native';
import { getTextStyles } from '../../../styles/common.styles';
import { Spaces } from '../../../styles/spaces';
import { BorderRadius } from '../../../styles/borderRadiuses';

export const useStyles = (theme) => StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: theme.colors.primary,
    height: Spaces.xlarge,
  },
  text: getTextStyles({
    fontSize: 20,
    textAlign: 'center'
  }),
  highlight: {
    textDecorationLine: 'underline',
  },
  outlined: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderWidth: 1,
    borderColor: theme.colors.black,
    borderRadius: BorderRadius.small
  },
  resetIcon: {
    position: 'absolute',
    right: Spaces.small


  },
  // container: {
  //   paddingLeft: Spaces.large,
  //   paddingRight: Spaces.large,
  //   height: Spaces.mxxlarge,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
