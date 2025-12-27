import { getPercentHeight, getPercentWidth, getTextStyles } from '../../styles/common.styles';
import { fontEnum } from '../../styles/fonts';
import { StyleSheet } from 'react-native';
import { Spaces } from '../../styles/spaces';
import { Colors } from '../../styles/colors';
import {BorderRadius as FontSizes, BorderRadius} from '../../styles/borderRadiuses';
import {getDevice} from "../../utilities/getCurrentDevice";

const IPadImage = {
  height: 250,
  width: 320,
  alignSelf: 'center',
  borderRadius: BorderRadius.medium
};

const IPhoneImage = {
  height: getPercentHeight(Spaces.xlarge),
  width: getPercentWidth(100),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
  },
  button: {
    backgroundColor: Colors.primary,

    // flex: 0.1,
  },
  buttonText: getTextStyles({
    color: Colors.black,
    fontSize: FontSizes.large,
    fontFamily: fontEnum.PoppinsBold,
  }),
  // Time
  timeContainer: {
    marginTop: Spaces.large,
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    paddingLeft: Spaces.medium,
    paddingRight: Spaces.medium,
  },
  timeText: getTextStyles({
    fontSize: 14,
  }),
  //Title
  titleContainer: {
    marginTop: Spaces.medium,
    alignItems: 'center',
  },
  title: getTextStyles({
    fontSize: 24,
    textAlign: 'center',
    paddingLeft: Spaces.medium,
    paddingRight: Spaces.medium,
    fontFamily: fontEnum.PoppinsBold,
  }),
  flag: {
    alignItems: 'center',
    marginTop: Spaces.small,
  },
  freeQuotaBanner: {
    marginTop: Spaces.medium,
    marginHorizontal: Spaces.medium,
    padding: Spaces.medium,
    backgroundColor: 'rgba(255, 184, 0, 0.12)',
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: BorderRadius.medium,
  },
  freeQuotaBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spaces.small,
  },
  freeQuotaBannerIcon: {
    width: Spaces.xxxlarge,
    height: Spaces.xxxlarge,
    borderRadius: BorderRadius.small,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  freeQuotaBannerText: {
    flex: 1,
  },
  freeQuotaBannerTitle: getTextStyles({
    fontSize: 16,
    fontFamily: fontEnum.PoppinsBold,
    color: Colors.black,
  }),
  freeQuotaBannerSubtitle: getTextStyles({
    fontSize: 14,
    color: Colors.black,
    marginTop: Spaces.xsmall,
  }),
  freeQuotaBannerButton: {
    marginTop: Spaces.small,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  freeQuotaBannerButtonText: getTextStyles({
    color: Colors.black,
    fontFamily: fontEnum.PoppinsSemiBold,
  }),

  imageContainer: {
    alignItems: "center",

    ...(getDevice() === 'iPad' ? {  borderRadius: BorderRadius.medium } : {})
  },
  image: {
    marginTop: Spaces.large,
    display: 'flex',
    justifyContent: 'center',
     alignItems: "center",
    ...(getDevice() === 'iPad' ? IPadImage : IPhoneImage)
  },

  imageIcon: {
    position: 'absolute',
    alignSelf: 'center',
    // left: getPercentWidth(50),
    // bottom: getPercentWidth(50),
    bottom: '30%',
  },

  region: getTextStyles({
    fontSize: 14,
    marginTop: Spaces.large,
    fontFamily: fontEnum.PoppinsExtraBold,
    color: Colors.red,
  }),
  viewed: getTextStyles({
    fontSize: 16,
    marginTop: Spaces.large,
    fontFamily: fontEnum.PoppinsSemiBold,
  }),
  sub: getTextStyles({
    fontSize: 18,
    marginTop: Spaces.small,
    fontFamily: fontEnum.PoppinsBold,
  }),
  calories: getTextStyles({
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: fontEnum.PoppinsMedium,
    marginTop: Spaces.medium
  }),
  PFCText: getTextStyles({
    fontSize: 16,
    fontFamily: fontEnum.PoppinsMedium,
  }),
  PFC: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spaces.medium
  },
  textSizeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spaces.small,
    marginTop: Spaces.medium,
  },
  textSizeLabel: getTextStyles({
    fontSize: 12,
    color: Colors.gray,
  }),
  textSizeLabelLarge: getTextStyles({
    fontSize: 18,
    color: Colors.gray,
  }),
  textSizeSlider: {
    flex: 1,
  },
  description: getTextStyles({
    fontSize: 16,
    marginTop: Spaces.medium,
  }),
  tip: getTextStyles({
    fontSize: 16,
    color: Colors.red,
    marginTop: Spaces.small,
  }),
  author: getTextStyles({
    marginTop: Spaces.small,
    color: Colors.red,
  }),
  servings: getTextStyles({
    fontSize: 20,
    textAlign: 'center',
    marginTop: Spaces.small,
  }),
  servingsButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spaces.small,
    marginTop: Spaces.small,
  },
  ingredientHeader: {
    alignItems: 'center',
    marginTop: Spaces.small,
  },
  ingredientLabel: getTextStyles({
    fontSize: 20,
    textAlign: 'center',
    marginBottom: Spaces.small,
    fontFamily: fontEnum.PoppinsBold,
    color: Colors.red
  }),
  ingredientsContainer: {
    marginLeft: Spaces.small,
    marginRight: Spaces.small,
  },
  actionsContainer: {
    marginTop: Spaces.medium,
    flexDirection: 'row',
  },
  actions: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spaces.medium,
  },
  action: {
    width: Spaces.xxxlarge,
  },
  measureButton: {
    marginTop: Spaces.medium,
    alignSelf: 'center',
  },
  step: {
    marginTop: Spaces.medium,
    marginLeft: Spaces.small,
    marginRight: Spaces.small,
  },
  stepTitle: getTextStyles({
    fontSize: 20,
    marginTop: Spaces.small,
    textAlign: 'center',
  }),
  stepName: getTextStyles({
    fontSize: 20,
    fontFamily: fontEnum.PoppinsBold,
    color: Colors.red
  }),
  underline: {
    textDecorationLine: 'underline',
  },
  stepDescription: getTextStyles({
    fontSize: 16,
    marginTop: Spaces.small,
  }),
  stepImage: {
    alignSelf: 'center',
    marginTop: Spaces.small,
    width: getPercentWidth(100),
    height: getPercentHeight(20),
  },
  listenIcon: {
    marginBottom: Spaces.xsmall,
  },
  ingredient: getTextStyles({
    fontSize: 18,
    justifyContent: 'space-between',
    marginBottom: Spaces.xsmall,
  }),
  ingredients: {
    marginTop: Spaces.small,
  },
  addToCardText: getTextStyles({
    fontSize: 14,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spaces.small,
    fontFamily: fontEnum.PoppinsSemiBold,
  }),
  addToCartButton: {
    marginTop: Spaces.small,
    marginRight: 'auto',
    marginLeft: 'auto'
  },

  // Voice assistant modal
  helpModal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpModalText: getTextStyles({
    marginTop: Spaces.small,
    fontSize: 18,
    textAlign: 'center',
  }),
  helpModalButton: {
    marginTop: Spaces.medium,
  },
  helpModalStartButtonText: getTextStyles({
    color: Colors.white,
  })
});

export default styles;
