import React from 'react';
import { useTranslator } from '../../../hooks/useTranslator';
import { StackNavigator } from '../../../components/molecular/stack-navigation/stack-navigation.component';
import {
  mainSettingsRoute,
  voiceSettingsRoute,
  subscriptionsSettingsRoute,
  faqRoute,
  storageRoute, devModeRoute
} from './profile.routes';
import { ProfilePage } from '../profile.page';
import { VoicePage } from '../voiceSettings/voiceSettings.page';
import { SubscriptionsPage } from '../subscriptions/subscriptions.page';
import { FaqPage } from '../faq/faq.page';
import {DevMode} from "../dev-mode/dev-mode";
import {SafeAreaView} from "react-native";

export const getStack = (t) => ([
  [mainSettingsRoute, ProfilePage, { title: t('profile')}],
  [voiceSettingsRoute, VoicePage, { title: t('voice') }],
  [subscriptionsSettingsRoute, SubscriptionsPage, { title: t('subscriptions') }],
  [faqRoute, FaqPage, { title: t('faq') }],
  [devModeRoute, DevMode, { title: 'Dev Mode' }],
]);

const ProfileNavigationComponent = (props) => {
  const {} = props;

  const [t] = useTranslator('navigation');
  const tabs = getStack(t);

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <StackNavigator
            tabs={tabs}
            initialRouteName={mainSettingsRoute}
        />
      </SafeAreaView>

  );
};

ProfileNavigationComponent.propTypes = {};

export const ProfileNavigation = ProfileNavigationComponent;
