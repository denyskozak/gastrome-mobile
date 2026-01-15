import { StyleSheet } from 'react-native';
import { Spaces } from '../../styles/spaces';
import { BorderRadius, getTextStyles } from '../../styles/common.styles';
import { fontEnum } from '../../styles/fonts';

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
    right: Spaces.medium,
    zIndex: 3,
    alignItems: 'center',
  },
  musicButton: {
    alignItems: 'center',
  },
  musicIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(60,60,67,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  musicOffSlash: {
    position: 'absolute',
    width: 3,
    height: 32,
    backgroundColor: '#ffffff',
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
});
