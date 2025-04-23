import { StyleSheet } from 'react-native';
import { Colors } from '../styles/colors';
import { getTextStyles } from '../styles/common.styles';
import { Spaces } from '../styles/spaces';

const headerTitleStyle = getTextStyles({
  fontSize: 24,
  textDecorationLine: 'none',
});

const styles = StyleSheet.create({
  container: {
    marginTop: Spaces.xxlarge,
    backgroundColor: Colors.backgroundColor
  },
  navigation: {
    backgroundColor: Colors.backgroundColor
  },
});

export const sceneContainerTheme = {
  colors: {
    background: Colors.backgroundColor,
  },
};


export const headerStyles = {
  headerTintColor: Colors.white,
  headerTitleStyle,
  headerStyle: {
    backgroundColor: Colors.backgroundColor,
    elevation: 0,
    shadowOpacity: 0,
  },
};

export const getScreenOptions = (isDarkModeMenu) => ({
  ...headerStyles,
  tabBarStyle: isDarkModeMenu
    ? {
      borderColor: Colors.black,
      backgroundColor: Colors.backgroundColor,
    }
    : {
      backgroundColor: 'rgba(52, 52, 52, 0.7)',
      position: 'absolute',
      bottom: 0,
      borderColor: Colors.backgroundColor,
    },
  tabBarIconStyle: {marginTop: Spaces.small},
  tabBarLabelStyle: {
    display: 'none'
  },
});

export default styles;
