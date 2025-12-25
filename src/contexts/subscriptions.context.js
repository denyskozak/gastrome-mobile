import React, { useContext, createContext } from 'react';
import { usePaymentSubscriptions } from '../hooks/usePaymentSubscriptions';

export const SubscriptionsContext = createContext(null);

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
    setCurrentSubscription,
    isLoaded
  } = context;

  return [
    isSubscriber,
    currentSubscription,
    subscriptions,
    setCurrentSubscription,
    isLoaded
  ];
};

// Component
const SubscriptionsComponent = (props) => {
  const {
    children,
  } = props;

  const [isSubscriber, currentSubscription, subscriptions, setCurrentSubscription, isLoaded] = usePaymentSubscriptions();

  const value = {
    isSubscriber,
    currentSubscription,
    subscriptions,
    setCurrentSubscription,
    isLoaded
  };

  return (
    <SubscriptionsContext.Provider value={value}>
      {children}
    </SubscriptionsContext.Provider>
  );
};

export const SubscriptionsContextWrapper = SubscriptionsComponent;
