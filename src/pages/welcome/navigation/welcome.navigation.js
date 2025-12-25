import React from 'react';
import { useTranslator } from '../../../hooks/useTranslator';
import { StackNavigator } from '../../../components/molecular/stack-navigation/stack-navigation.component';
import { RecipePage } from '../../recipe/recipe.page';

import { welcomeRoute, recipeRoute } from './welcome.routes';
import { HomeScreen } from '../../home/HomeScreen';
import { cookingRoute, voiceSettingsRecipeRoute } from '../../recipes/navigation/recipes.routes';
import { CookingPage } from '../../cooking/cooking.page';
import { VoicePage } from '../../profile/voiceSettings/voiceSettings.page';

export const getStack = (t) => ([
  [welcomeRoute, HomeScreen, { title: t('home'), headerShown: false,}],
  [cookingRoute, CookingPage, { title: '', headerShown: false }],
  [recipeRoute, RecipePage, { title: t('recipe'), headerShown: true }],
  [voiceSettingsRecipeRoute, VoicePage, { title: t('voice') }],
]);

const RecipesNavigationComponent = (props) => {
  const {} = props;

  const [t] = useTranslator('navigation');
  const tabs = getStack(t);

  return (
      <StackNavigator
        tabs={tabs}
        initialRouteName={welcomeRoute}
      />
  );
};

RecipesNavigationComponent.propTypes = {};

export const WelcomeNavigation = RecipesNavigationComponent;
