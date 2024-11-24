import React from 'react';
import Icon from '@expo/vector-icons/Ionicons';

import {
  cartPageRoute,
  profilePageRoute, recipesPageRoute,
  welcomePageRoute
} from './navigation.routes';
import { Animated } from '../components/atomic/animated/animated.component';

import { Colors } from '../styles/colors';
import { CartPage } from '../pages/cart/cart.page';
import { ProfileNavigation } from '../pages/profile/navigation/profile.navigation';
import { RecipesNavigation } from '../pages/recipes/navigation/recipes.navigation';
import { Spaces } from '../styles/spaces';
import { WelcomeNavigation } from '../pages/welcome/navigation/welcome.navigation';
import {AuthorsPage} from "../pages/authors/authors.page";
import {authorsRoute} from "../pages/recipes/navigation/recipes.routes";
import {AuthorsNavigation} from "../pages/authors/navigation/recipes.navigation";

const createRenderIcon = (name, size = 32, darkMode = false, delay = 2150) => () => (
  <Animated style={{ width: size, }} name="FadeInDown" delay={delay}><Icon name={name} size={size} color={darkMode ? Colors.black : Colors.second}/></Animated>
);

export const getNavigationTabs = (t, isDarkModeMenu) => {
  const renderIcon = (title, delay = 1000) => createRenderIcon(
    title,
    Spaces.xlarge,
    isDarkModeMenu,
    delay,
  );

  return [
    [
      welcomePageRoute,
      WelcomeNavigation,
      {
        headerShown: false,
        tabBarIcon: renderIcon('home-outline', 1000),
      },
    ],
    [
      authorsRoute,
      AuthorsNavigation,
      {
        title: t('authors'),
        headerShown: false,
        tabBarIcon: renderIcon('people-outline', 1250),
      },
    ],
    [
      recipesPageRoute,
      RecipesNavigation,
      {
        headerShown: false,
        tabBarIcon: renderIcon('book-outline', 1250),
      },
    ],
    [
      cartPageRoute,
      CartPage,
      {
        headerShown: true,
        title: t('cart'),
        tabBarIcon: renderIcon('cart-outline', 1500)
      },
    ],
    [
      profilePageRoute,
      ProfileNavigation,
      {
        title: t('profile'),
        headerShown: false,
        tabBarIcon: renderIcon('cog-outline', 1750),
      },
    ],
  ];
};




