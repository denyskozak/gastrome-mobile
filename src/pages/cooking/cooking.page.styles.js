import { StyleSheet } from 'react-native';
import { Spaces } from '../../styles/spaces';
import { BorderRadius, getTextStyles } from '../../styles/common.styles';
import { fontEnum } from '../../styles/fonts';
import {getDevice} from "../../utilities/getCurrentDevice";

export const useStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  timer: {
    position: 'absolute',
    bottom: '50%',
    alignSelf: 'center',
    zIndex: 2,
  },
  musicButtonContainer: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 3,
    right: getDevice() === 'iPad' ? '10%' : '5%',
    bottom: Spaces.xxlarge,
    flexDirection: 'row',
    gap: Spaces.small,
  },
  musicButton: {
    alignItems: 'center',
  },
  musicIcon: {
    width: Spaces.xxlarge + Spaces.large,
    height: Spaces.xxlarge + Spaces.large,
    borderRadius: 60,
    backgroundColor: theme.colors.second,
    alignItems: 'center',
    justifyContent: 'center',
  },
  musicOffSlash: {
    position: 'absolute',
    width: 3,
    height: Spaces.xxlarge,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
  },
  musicLabel: getTextStyles({
    color: '#fff',
    marginTop: 4,
    fontSize: 12,
  }),
  helpModal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpModalTitle: getTextStyles({
    marginTop: Spaces.small,
    fontSize: 18,
    textAlign: 'center',
    color: theme.colors.white
  }),
  helpModalButton: {
    marginTop: Spaces.medium,
  },

  backButtonLeftContainer: {
    position: 'absolute',
    zIndex: 2,
    left: getDevice() === 'iPad' ? '10%' : '5%',
    bottom: Spaces.xxlarge,
    flexDirection: 'row',
    gap: Spaces.small,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: theme.colors.primary,
  },
  backButtonRightContainer: {
    position: 'absolute',
    zIndex: 2,
    right: getDevice() === 'iPad' ? '10%' : '5%',
    bottom: Spaces.xxlarge,
    flexDirection: 'row',
    gap: Spaces.small,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: theme.colors.primary,
  },
  backPause: {
    position: 'absolute',
    bottom: '50%',
  },
  backButton: {
    backgroundColor: theme.colors.white,
  },
  backButtonText: getTextStyles({
    fontSize: 18,
    color: theme.colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }),
});
