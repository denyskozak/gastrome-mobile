import { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { getTextStyles } from '../styles/common.styles';
import { Spaces } from '../styles/spaces';
import { useTheme } from '../hooks/useTheme';
import {DefaultTheme} from "@react-navigation/native";

export const useNavigationStyles = () => {
  const { theme } = useTheme();

  const headerTitleStyle = useMemo(() => getTextStyles({
    fontSize: 24,
    textDecorationLine: 'none',
  }, theme), [theme]);

  const styles = useMemo(() => StyleSheet.create({
    container: {
      marginTop: Spaces.xxlarge,
      backgroundColor: theme.colors.backgroundColor,
    },
    navigation: {
      backgroundColor: theme.colors.backgroundColor,
    },
  }), [theme]);

  const sceneContainerTheme = useMemo(
      () => ({
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.colors.backgroundColor,
        },
      }),
      [theme]
  );

  const headerStyles = useMemo(() => ({
    headerTintColor: theme.colors.white,
    headerTitleStyle,
    headerStyle: {
      backgroundColor: theme.colors.backgroundColor,
      elevation: 0,
      shadowOpacity: 0,
    },
  }), [headerTitleStyle, theme]);

  const getScreenOptions = useCallback((isDarkModeMenu) => ({
    ...headerStyles,
    tabBarStyle: isDarkModeMenu
      ? {
        borderColor: theme.colors.black,
        backgroundColor: theme.colors.backgroundColor,
      }
      : {
        backgroundColor: 'rgba(52, 52, 52, 0.7)',
        position: 'absolute',
        bottom: 0,
        borderColor: theme.colors.backgroundColor,
      },
    tabBarIconStyle: { marginTop: Spaces.small },
    tabBarLabelStyle: {
      display: 'none',
    },
  }), [headerStyles, theme]);

  return {
    styles,
    sceneContainerTheme,
    getScreenOptions,
  };
};
