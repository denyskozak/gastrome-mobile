import React from 'react';
import Icon from '@expo/vector-icons/Ionicons';

import {
  authorsPageRoute,
  cartPageRoute, healthPageRoute,
  profilePageRoute, recipesPageRoute,
  welcomePageRoute
} from './navigation.routes';
import { Animated } from '../components/atomic/animated/animated.component';

import { CartPage } from '../pages/cart/cart.page';
import { ProfileNavigation } from '../pages/profile/navigation/profile.navigation';
import { RecipesNavigation } from '../pages/recipes/navigation/recipes.navigation';
import { Spaces } from '../styles/spaces';
import { WelcomeNavigation } from '../pages/welcome/navigation/welcome.navigation';
import {AuthorsNavigation} from "../pages/authors/navigation/recipes.navigation";
import {AttentionAnimation} from "../components/molecular/attansion-animation/attansion-animation.component";
import {HealthNavigation} from "../pages/health/navigation/health.navigation";

const createRenderIcon = (name, color, size = 32, darkMode = false, delay = 2150, attention = false) => () => {

  const element = <Animated style={{ width: size, }} name="FadeInDown" delay={delay}><Icon name={name} size={size} color={color}/></Animated>;
  return attention === false
      ? element
      : <AttentionAnimation property="translateY" start={0} end={-5} delay={2000}>{element}</AttentionAnimation>
};

export const getNavigationTabs = (t, isDarkModeMenu, theme) => {
  const renderIcon = (title, delay = 1000, attention = false) => createRenderIcon(
    title,
    theme.colors.white,
    30,
    isDarkModeMenu,
    delay,
      attention,
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
    // [
    //   authorsPageRoute,
    //   AuthorsNavigation,
    //   {
    //     title: t('authors'),
    //     headerShown: false,
    //     tabBarIcon: renderIcon('people-outline', 1250),
    //   },
    // ],
    [
      healthPageRoute,
      HealthNavigation,
      {
        title: t('health'),
        headerShown: false,
        tabBarIcon: renderIcon('heart-half-outline', 1250),
      },
    ],
    [
      recipesPageRoute,
      RecipesNavigation,
      {
        headerShown: false,
        tabBarIcon: renderIcon('book-outline', 1250, true),
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




