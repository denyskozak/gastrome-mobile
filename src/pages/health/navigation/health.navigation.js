import React from 'react';
import { useTranslator } from '../../../hooks/useTranslator';

import { StackNavigator } from '../../../components/molecular/stack-navigation/stack-navigation.component';
import { RecipePage } from '../../recipe/recipe.page';
import { CookingPage } from '../../cooking/cooking.page';
import { AuthorPage } from '../../author/author.page';
import {HealthPage} from "../health.page";
import {SafeAreaView, View} from "react-native";
import {healthRoute, supplementRoute} from "./health.routes";
import {SupplementPage} from "../supplement/supplement.page";

export const getStack = (t) => ([
  [healthRoute, HealthPage, { title: t('health') }],
  [supplementRoute, SupplementPage, { title: t('supplement') }],
]);

const HealthNavigationComponent = (props) => {
  const {} = props;

  const [t] = useTranslator('navigation');
  const tabs = getStack(t);

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <StackNavigator
            tabs={tabs}
            initialRouteName={healthRoute}
        />
      </SafeAreaView>

  );
};

HealthNavigationComponent.propTypes = {};

export const HealthNavigation = HealthNavigationComponent;
