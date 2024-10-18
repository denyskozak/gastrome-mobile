import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getNavigationTabs } from './navigations.items';
import { sceneContainerTheme, getScreenOptions } from './navigation.styles';
import { useTranslator } from '../hooks/useTranslator';
import { useMenuDarkMode } from '../contexts/menuDarkMode.context';
import {recipesPageRoute, welcomePageRoute} from "./navigation.routes";
import PropTypes from "prop-types";

const Tab = createBottomTabNavigator();

const NavigationTabsComponent = (props) => {
  const { isFirstRunEver} = props;
  const [isDarkModeMenu] = useMenuDarkMode();
  const [t] = useTranslator('navigation');
  const tabs = getNavigationTabs(t, isDarkModeMenu);

  return (
    <NavigationContainer theme={sceneContainerTheme}>
      <Tab.Navigator
        initialRouteName={isFirstRunEver ? welcomePageRoute : recipesPageRoute}
        screenOptions={getScreenOptions(isDarkModeMenu)}
      >
          {tabs.map(([id, component, options]) => (
            <Tab.Screen
              key={id}
              name={id}
              component={component}
              options={options}
            />
          ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

NavigationTabsComponent.propTypes = {
    isFirstRunEver: PropTypes.bool.isRequired,
}

export const Navigation = NavigationTabsComponent;