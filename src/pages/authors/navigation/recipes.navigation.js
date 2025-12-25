import React from 'react';
import { useTranslator } from '../../../hooks/useTranslator';

import { StackNavigator } from '../../../components/molecular/stack-navigation/stack-navigation.component';
import { RecipePage } from '../../recipe/recipe.page';
import { CookingPage } from '../../cooking/cooking.page';
import { AuthorPage } from '../../author/author.page';
import {AuthorsPage} from "../authors.page";
import {SafeAreaView, View} from "react-native";
import {authorRoute, authorsRoute, cookingRoute, recipeRoute} from "../../recipes/navigation/recipes.routes";

export const getStack = (t) => ([
  [recipeRoute, RecipePage, { title: t('recipe') }],
  [cookingRoute, CookingPage, { title: '', headerShown: false }],
  [
    authorRoute,
    AuthorPage,
    {
      title: t('author'),
      headerShown: true,
    },
  ],
  [
    authorsRoute,
    AuthorsPage,
    {
      title: t('authors'),
      headerShown: true,
    },
  ],
]);

const AuthorsNavigationComponent = () => {
  const [t] = useTranslator('navigation');
  const tabs = getStack(t);

  return (
      <View style={{ flex: 1 }}>
        <StackNavigator
            tabs={tabs}
            initialRouteName={authorsRoute}
        />
      </View>

  );
};

export const AuthorsNavigation = AuthorsNavigationComponent;
