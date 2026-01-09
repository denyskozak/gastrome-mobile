import { StyleSheet } from 'react-native';
import { getTextStyles } from '../../../styles/common.styles';
import { fontEnum } from '../../../styles/fonts';
import { Spaces } from '../../../styles/spaces';
import {BorderRadius as FontSizes, BorderRadius} from '../../../styles/borderRadiuses';
import { getDevice } from '../../../utilities/getCurrentDevice';

export const useStyles = (theme) => StyleSheet.create({
  container: {
    marginTop: Spaces.medium,
    alignItems: 'center',
    width: '100%',
  },
  content: {
    marginTop: Spaces.small,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  imageTouchable: {
    borderRadius: BorderRadius.small
  },
  image: {
    height: 250,
    width: 320,
    borderRadius: BorderRadius.small
  },
  imageIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  imageBlockIcon: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,

    alignItems: 'center',
    justifyContent: 'center',
  },
  freeBadge: {
    position: 'absolute',
    top: Spaces.small,
    left: Spaces.small,
    backgroundColor: theme.colors.black,
    borderRadius: BorderRadius.small,
    paddingHorizontal: Spaces.small,
    paddingVertical: Spaces.xxsmall,
  },
  freeBadgeText: getTextStyles({
    fontSize: 18,
    color: theme.colors.white,
  }),
  like: {
    marginBottom: Spaces.small,
  },
  icons: {
    alignItems: 'center',
    marginBottom: Spaces.small,
    gap: Spaces.small,
    flexDirection: 'row',
  },
  timeContainer: {
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    paddingLeft: Spaces.medium,
    paddingRight: Spaces.medium,
  },
  timeText: getTextStyles(),
  hasVideoSteps: getTextStyles({
    fontSize: 16,
    fontFamily: fontEnum.PoppinsBold,
    textAlign: 'center',
    color: theme.colors.red,
    marginBottom: Spaces.small,
  }),
  hasVideoIcon: {
    position: 'absolute',
  },
  title: getTextStyles({
    fontSize: FontSizes.large,
    fontFamily: fontEnum.PoppinsSemiBold,
    textAlign: 'center',
    marginTop: Spaces.small,
  }),
  subTitle: getTextStyles({
    fontSize: 16,
    marginTop: Spaces.small,
    marginLeft: Spaces.small,
    marginRight: Spaces.small,
  }),
  ingredients: getTextStyles({
    fontSize: 16,
    marginTop: Spaces.small,
    marginLeft: Spaces.small,
    marginRight: Spaces.small,
    textAlign: 'center',
  }),
  selectedIngredients: getTextStyles({
    fontSize: 16,
    color: theme.colors.black,
  }),
  selectButton: {
    marginTop: Spaces.medium,
    borderColor: theme.colors.red,
  },
  selectButtonText: getTextStyles({
    fontSize: 24,
    color: theme.colors.red,
  }),
});
