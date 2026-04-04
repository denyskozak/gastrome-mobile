import { useEffect, useState } from 'react';
import { isFirstLaunch } from '../utilities/isFirstLaunch';
import { delayForPromise } from '../utilities/promiseDelay';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useIsFirstLaunchByKey = (asyncStoreKey) => {
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        const firstLaunchState = await isFirstLaunch(asyncStoreKey);
        await delayForPromise(500);
        if (firstLaunchState && asyncStoreKey) {
          await AsyncStorage.setItem(asyncStoreKey, 'true');
          setIsFirst(true);
        }
      })()
    } catch (e) {
      console.log('useIsFirstLaunchByKey Error: ', asyncStoreKey, e);
    }
  }, [setIsFirst]);


  return [isFirst, setIsFirst];
};
