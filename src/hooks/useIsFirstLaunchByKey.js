import { useEffect, useState } from 'react';
import { isFirstLaunch } from '../utilities/isFirstLaunch';
import { delayForPromise } from '../utilities/promiseDelay';
import AsyncStorage from '@react-native-community/async-storage';

export const useIsFirstLaunchByKey = (asyncStoreKey) => {
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        const FirstLaunchState = await isFirstLaunch(asyncStoreKey);
        await delayForPromise(500);
        if (FirstLaunchState && asyncStoreKey) {
          AsyncStorage.setItem(asyncStoreKey, 'true');
          setIsFirst(true);
        }
      })()
    } catch (e) {
      console.log('useIsFirstLaunchByKey Error: ', e);
    }
  }, [setIsFirst]);


  return [isFirst, setIsFirst];
};
