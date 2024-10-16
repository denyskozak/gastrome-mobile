import React from 'react';
import { useTranslator } from '../../../hooks/useTranslator';
import { StackNavigator } from '../../../components/molecular/stack-navigation/stack-navigation.component';
import {
  mainSettingsRoute,
  voiceSettingsRoute,
  subscriptionsSettingsRoute,
  faqRoute,
  storageRoute
} from './profile.routes';
import { ProfilePage } from '../profile.page';
import { VoicePage } from '../voiceSettings/voiceSettings.page';
import { SubscriptionsPage } from '../subscriptions/subscriptions.page';
import { FaqPage } from '../faq/faq.page';
import { StoragePage } from '../storage/storage.page';

export const getStack = (t) => ([
  [mainSettingsRoute, ProfilePage, { title: t('profile')}],
  [voiceSettingsRoute, VoicePage, { title: t('voice') }],
  [storageRoute, StoragePage, { title: t('storage') }],
  [subscriptionsSettingsRoute, SubscriptionsPage, { title: t('subscriptions') }],
  [faqRoute, FaqPage, { title: t('faq') }],
]);

const ProfileNavigationComponent = (props) => {
  const {} = props;

  const [t] = useTranslator('navigation');
  const tabs = getStack(t);

  return (
      <StackNavigator
        tabs={tabs}
        initialRouteName={mainSettingsRoute}
      />
  );
};

ProfileNavigationComponent.propTypes = {};

export const ProfileNavigation = ProfileNavigationComponent;
