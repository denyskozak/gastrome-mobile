import { StyleSheet } from 'react-native';
import { getTextStyles } from '../../../styles/common.styles';
import { fontEnum } from '../../../styles/fonts';
import { Spaces } from '../../../styles/spaces';
import { BorderRadius } from '../../../styles/borderRadiuses';

export const useStyles = (theme) => StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '80%',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spaces.large,
  },
  image: {
    height: 250,
    width: 320,
    borderRadius: BorderRadius.small
  },
  pageTitle: getTextStyles({
    fontSize: 20,
    fontFamily: fontEnum.PoppinsSemiBold,
    textAlign: 'center',
  }),
  recipe: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeContainer: {
    marginTop: Spaces.small,
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    paddingLeft: Spaces.medium,
    paddingRight: Spaces.medium,
  },
  title: getTextStyles({
    fontSize: 20,
    fontFamily: fontEnum.PoppinsSemiBold,
    marginTop: Spaces.small,
    textAlign: 'center',
  }),
  imageIcon: {
    position: 'absolute',
    bottom: Spaces.small,
    left: Spaces.small,
  },
  ingredients: getTextStyles({
    fontSize: 16,
    marginTop: Spaces.small,
    marginLeft: Spaces.small,
    marginRight: Spaces.small,
    textAlign: 'center',
  }),
  subscriptionsInto: getTextStyles({
    fontSize: 14,
    fontFamily: fontEnum.PoppinsSemiBold,
    textAlign: 'center',
    textDecorationLine: 'underline',
    width: Spaces.xxxlarge * 4
  }),
  getNewButton: {},
  getNewText: {
    fontSize: 20,
    color: theme.colors.black
  },
});
