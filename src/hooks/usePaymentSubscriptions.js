import Purchases, { PurchasesOffering } from 'react-native-purchases';
import { Platform } from 'react-native';
import { useCallback, useEffect, useState } from 'react';

const APIKeys = {
  apple: 'appl_AOZCQMNpVGLRewOpOxAGWBvZnCC',
  google: '',
};

const mapActiveSubscription = (data) => {
  const name = data.activeSubscriptions[0];

  return {
    name,
    // price: data.activeSubscriptions
    expirationDate: data.latestExpirationDate,
    firstSeen: data.firstSeen,
  };
};

export const usePaymentSubscriptions = () => {
  const [currentOffering, setCurrentOffering] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [currentActive, setCurrentActive] = useState({
    name: '',
    expirationDate: '',
    firstSeen: '',
  });

  const setCurrentSubscription = useCallback(data => setCurrentActive(mapActiveSubscription(data)), []);

  useEffect(() => {
    const setup = async () => {
      if (Platform.OS === 'android' && APIKeys.google !== '') {
        await Purchases.configure({apiKey: APIKeys.google});
      } else {
        await Purchases.configure({apiKey: APIKeys.apple});
      }

      const offerings = await Purchases.getOfferings();
      const info = await Purchases.getCustomerInfo();

      if (info && info.activeSubscriptions && info.activeSubscriptions.length > 0) {
        setCurrentSubscription(info);
      }
      setCurrentOffering(offerings.current);
      setLoaded(true);
    };

    setup()
      .then(() => {
        console.log('Payment has been setup')
      })
      .catch((e) => {
        console.log('Payment has error in setup', e)
      });
  }, []);

  const isActive = Boolean(currentActive.name);

  return [
    isActive,
    currentActive,
    currentOffering,
    setCurrentSubscription,
    isLoaded
  ];
};
