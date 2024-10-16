import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as Linking from 'expo-linking';

import { useTranslator } from '../../../hooks/useTranslator';
import { Button } from '../../../components/atomic/button/button.component';
import { useSubscriptions } from '../../../contexts/subscriptions.context';

import styles from './subscriptions.styles';
import { SubscriptionsModal } from '../../../components/templates/subscriptions-modal/subscriptions-modal';
import { isAvailableAsync, requestReview } from 'expo-store-review';

const SubscriptionsPageComponent = () => {
  const [
    t,
  ] = useTranslator('pages.profile');

  const [isSubscriber, activeSubscription] = useSubscriptions();
  const [isSubscriptionsOpened, setSubscriptionsOpened] = useState(false);

  return (
    <View>
      <View style={styles.subscriptions}>
        <Text style={styles.subscriptionText}>{t(isSubscriber ? 'subscriptionsTitle' : 'inActiveSubscriberTitle')}</Text>
        {isSubscriber && (
          <View>
            <Text style={styles.subscriptionText}>{t('subscribed', { name: activeSubscription.name })}</Text>
            <Text style={styles.subscriptionText}>{t('firstSeen', { date: new Date(activeSubscription.firstSeen).toLocaleDateString() })}</Text>
            <Text style={styles.subscriptionText}>{t('expires', { date: new Date(activeSubscription.expirationDate).toLocaleDateString() })}</Text>
          </View>
        )}
        {isSubscriber && (
          <Button
            type="outlined"
            style={styles.howToCancelButton}
            title={t('howToCancel')}
            onPress={() => Linking.openURL('App-prefs:APPLE_ACCOUNT&path=SUBSCRIPTIONS')}
          />
        )}
        {!isSubscriber && (
          <Button
            type="outlined"
            style={styles.settingButton}
            title={t('chooseSubscription')}
            onPress={() => setSubscriptionsOpened(true)}
          />
        )}
        <SubscriptionsModal
          isOpen={isSubscriptionsOpened}
          onChangeVisible={() => {
            setSubscriptionsOpened(false)
          }}
        />
      </View>
    </View>
  );
};

export const SubscriptionsPage = SubscriptionsPageComponent;