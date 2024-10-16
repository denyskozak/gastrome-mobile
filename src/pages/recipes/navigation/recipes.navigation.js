import React from 'react';
import { useTranslator } from '../../../hooks/useTranslator';
import {
  recipesRoute,
  recipeRoute,
  cookingRoute,
  voiceSettingsRecipeRoute,
  recipesGroceryRoute, authorRoute, authorsRoute
} from './recipes.routes';
import { StackNavigator } from '../../../components/molecular/stack-navigation/stack-navigation.component';
import { RecipesPage } from '../recipes.page';
import { RecipePage } from '../../recipe/recipe.page';
import { groceryRoute } from '../../grocery/grocery.routes';
import { GroceryPage } from '../../grocery/grocery.page';
import { CookingPage } from '../../cooking/cooking.page';
import { VoicePage } from '../../profile/voiceSettings/voiceSettings.page';
import { AuthorPage } from '../../author/author.page';
import {AuthorsPage} from "../../authors/authors.page";

export const getStack = (t) => ([
  [recipesRoute, RecipesPage, { title: t('recipes')}],
  [recipeRoute, RecipePage, { title: t('recipe') }],
  [groceryRoute, GroceryPage, { title: t('grocery') }],
  [voiceSettingsRecipeRoute, VoicePage, { title: t('voice') }],
  [cookingRoute, CookingPage, { title: '', headerShown: false }],
  [
    recipesGroceryRoute,
    GroceryPage,
    {
      title: t('grocery'),
      headerShown: true,
    },
  ],
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
      title: t('author'),
      headerShown: true,
    },
  ],
]);

const RecipesNavigationComponent = (props) => {
  const {} = props;

  const [t] = useTranslator('navigation');
  const tabs = getStack(t);

  return (
      <StackNavigator
        tabs={tabs}
        initialRouteName={recipesRoute}
      />
  );
};

RecipesNavigationComponent.propTypes = {};

export const RecipesNavigation = RecipesNavigationComponent;
