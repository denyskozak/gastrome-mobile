import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

import { fonts } from './styles/fonts';

import { AppContextWrapper } from './AppContextWrapper';
// import { OnBoard, useIsOnBoarding } from './components/molecular/on-boarding/on-boarding.component';
import { SplashScreen as CustomSplashScreen } from './components/molecular/splash-screen/splash-screen.component';
import { delayForPromise } from './utilities/promiseDelay';
import {Layout, NavigationWrapper} from "./Layout.js";
import {isFirstLaunch} from "./utilities/isFirstLaunch";
import {IS_FIRST_LAUNCH_EVER_STORE_KEY} from "./constants/asyncStoreKeys";
import AsyncStorage from "@react-native-community/async-storage";
import {Navigation} from "./navigation/navigation.js";

SplashScreen.preventAutoHideAsync().then().catch(() => console.log('error-splash-prevent-auto-hide'));

export const App = () => {
  const [fontsLoaded] = useFonts(fonts);
  // const [appIsReady, setAppIsReady] = useState(false);
  // const [isOnBoarding, setIsOnBoarding] = useIsOnBoarding();
  const [isVisibleCustomSplashScreen, setVisibleCustomSplashScreen] = useState(true);
  const [isFirstRunEver, setIsFirstRunEver] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      try {
        (async () => {
          const isFirstLaunchEverFlag = await isFirstLaunch(IS_FIRST_LAUNCH_EVER_STORE_KEY);
          if (isFirstLaunchEverFlag) {
            setIsFirstRunEver(true);
            await AsyncStorage.setItem(IS_FIRST_LAUNCH_EVER_STORE_KEY, 'true');
          }
          await delayForPromise(500);
          SplashScreen.hideAsync().then().catch(() => console.log('error-splash-hide'));
          await delayForPromise(2000);
          setVisibleCustomSplashScreen(false);
        })();
      } catch (e) {
        console.log('Splash screen error: ', e);
      }

    }
  }, [fontsLoaded]);

  return (
    <View style={{ flex: 1 }}>
      {!fontsLoaded || isVisibleCustomSplashScreen ? <CustomSplashScreen /> : null}
      {/*TODO Remove onboarding */}
      {/*{fontsLoaded && !isVisibleCustomSplashScreen && isOnBoarding ? <OnBoard onEnd={() => setIsOnBoarding(false)}/> : null}*/}
      {fontsLoaded && !isVisibleCustomSplashScreen
          ? (<AppContextWrapper><Layout><Navigation isFirstRunEver={isFirstRunEver} /></Layout></AppContextWrapper> )
          : null}
    </View>
  );
};
