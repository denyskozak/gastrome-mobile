import { StyleSheet } from 'react-native';
import { createThemedStyles } from '../../styles/useThemedStyles';
import { getPercentHeight, getPercentWidth, getTextStyles } from '../../styles/common.styles';
import { fontEnum } from '../../styles/fonts';
import { Spaces } from '../../styles/spaces';

export const useWelcomeStyles = createThemedStyles((theme) => StyleSheet.create({
  pageContainer: {
    alignItems: 'center',
    height: getPercentHeight(100),
    width: getPercentWidth(100),
    position: 'relative',
  },
  pageContent: {
    height: '100%',
    width: '100%',
    marginTop: Spaces.xxlarge,
  },
  text: {
    position: 'absolute',
    top: getPercentHeight(10),
    left: 0,
    zIndex: 2,
  },
  video: {
    height: '100%',
    width: getPercentHeight(100),
  },
  videoLayer: {
    height: '100%',
    width: getPercentHeight(100),
    backgroundColor: theme.colors.backgroundColor,
    opacity: 0.8,
    position: 'absolute',
    zIndex: 1,
  },
  letGoButtonText: getTextStyles({
    fontSize: 20,
  }, theme),
  letGoButton: {
    borderColor: theme.colors.white,
  },
  scrollDown: {
    position: 'absolute',
    bottom: '12%',
    zIndex: 2,
  },
  scrollDownButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollDownText: getTextStyles({
    fontSize: 18,
    color: theme.colors.white,
    fontWeight: '200',
  }, theme),
  letGoButtonContainer: {
    marginTop: Spaces.medium,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  filtersSection: {
    flexDirection: 'row',
    gap: Spaces.medium,
    margin: Spaces.small,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  modalTitle: getTextStyles({
    marginTop: Spaces.large,
    fontFamily: fontEnum.PoppinsMedium,
    fontSize: 24,
    textAlign: 'center',
  }, theme),
  modalText: getTextStyles({
    marginTop: Spaces.large,
    fontSize: 18,
    textAlign: 'center',
  }, theme),
  modalButton: {
    marginTop: Spaces.medium,
  },
}));
