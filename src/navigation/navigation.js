import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getNavigationTabs } from './navigations.items';
import { sceneContainerTheme, getScreenOptions } from './navigation.styles';
import { useTranslator } from '../hooks/useTranslator';
import { useMenuDarkMode } from '../contexts/menuDarkMode.context';

const Tab = createBottomTabNavigator();

const NavigationTabsComponent = (props) => {
  const {} = props;
  const [isDarkModeMenu] = useMenuDarkMode();
  const [t] = useTranslator('navigation');
  const tabs = getNavigationTabs(t, isDarkModeMenu);

  return (
    <NavigationContainer theme={sceneContainerTheme}>
      <Tab.Navigator
        initialRouteName={tabs[0][0]}
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

export const Navigation = NavigationTabsComponent;