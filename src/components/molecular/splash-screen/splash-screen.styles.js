import { StyleSheet } from 'react-native';
import { getTextStyles } from '../../../styles/common.styles';
import { fontEnum } from '../../../styles/fonts';
import {Spaces} from "../../../styles/spaces";

export const useStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    position: 'absolute',
    width: '100%',
    top: 0,
    gap: 8,
    zIndex: 10,
  },
  title: getTextStyles({
    fontSize: 28,
    fontFamily: fontEnum.PoppinsSemiBold
  }),
  subtitle: getTextStyles({
    marginTop: Spaces.medium,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18,
  }),
  by: {

    position: 'absolute',
    bottom: '10%',
    fontSize: 18,
    textDecorationLine: 'none',
    fontWeight: '300',
    color: theme.colors.black
  },
});
