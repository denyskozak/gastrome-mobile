import React, { useContext, createContext } from 'react';
import PropsType from 'prop-types';
import { usePaymentSubscriptions } from '../hooks/usePaymentSubscriptions';

export const SubscriptionsContext = createContext([]);

// Hook
export const useSubscriptions = () => {
  const context = useContext(SubscriptionsContext);

  if (!context) {
    throw new Error('useSubscriptions must be used within a SubscriptionsContext.Provider')
  }

  const {
    isSubscriber,
    currentSubscription,
    subscriptions,
    setCurrentSubscription
  } = context;

  return [
    isSubscriber,
    currentSubscription,
    subscriptions,
    setCurrentSubscription
  ];
};

// Component
const SubscriptionsComponent = (props) => {
  const {
    children,
  } = props;

  const [isSubscriber, currentSubscription, subscriptions, setCurrentSubscription] = usePaymentSubscriptions();

  const value = {
    isSubscriber,
    currentSubscription,
    subscriptions,
    setCurrentSubscription
  };

  return (
    <SubscriptionsContext.Provider value={value}>
      {children}
    </SubscriptionsContext.Provider>
  );
};

SubscriptionsComponent.propTypes = {
  children: PropsType.object.isRequired,
};

export const SubscriptionsContextWrapper = SubscriptionsComponent;