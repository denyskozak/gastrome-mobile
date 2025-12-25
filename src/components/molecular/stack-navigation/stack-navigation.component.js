import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { headerStyles } from '../../../navigation/navigation.styles';

const Stack = createNativeStackNavigator();

const StackNavigatorComponent = (props) => {
  const {
    initialRouteName,
    tabs,
  } = props;

  const renderTab = ([id, component, options]) => (
    <Stack.Screen
      key={id}
      name={id}
      component={component}
      options={options}
    />
  );

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ ...headerStyles, headerShown: true }}
    >
      {tabs.map(renderTab)}
    </Stack.Navigator>
  );
};

export const StackNavigator = StackNavigatorComponent;
