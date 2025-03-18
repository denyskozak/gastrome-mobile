import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View} from 'react-native';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from "@react-native-community/async-storage";

import { fonts } from './styles/fonts';

import { AppContextWrapper } from './AppContextWrapper';
import { SplashScreen as CustomSplashScreen } from './components/molecular/splash-screen/splash-screen.component';
import { delayForPromise } from './utilities/promiseDelay';
import {Layout} from "./Layout.js";
import {isFirstLaunch} from "./utilities/isFirstLaunch";
import {IS_FIRST_LAUNCH_EVER_STORE_KEY, SETTINGS_ASYNC_STORE_KEY} from "./constants/asyncStoreKeys";
import {Navigation} from "./navigation/navigation.js";
import {Colors} from "./styles/colors";
import {OnBoard, useIsOnBoarding} from "./components/molecular/on-boarding/on-boarding.component";
import {isAvailableAsync, requestReview} from "expo-store-review";

SplashScreen.preventAutoHideAsync().then().catch(() => console.log('error-splash-prevent-auto-hide'));
let defaultSettings = null;
export const App = () => {
  const [fontsLoaded] = useFonts(fonts);
  // const [appIsReady, setAppIsReady] = useState(false);
  const [isOnBoarding, setIsOnBoarding] = useIsOnBoarding();
  const [isVisibleCustomSplashScreen, setVisibleCustomSplashScreen] = useState(true);

  useEffect(() => {
    if (fontsLoaded) {
      try {
        (async () => {
          const isFirstLaunchEverFlag = await isFirstLaunch(IS_FIRST_LAUNCH_EVER_STORE_KEY);
          if (isFirstLaunchEverFlag) {
            await AsyncStorage.setItem(IS_FIRST_LAUNCH_EVER_STORE_KEY, 'true');
          }

          // set default settings
          const storeConfigJSON = await AsyncStorage.getItem(SETTINGS_ASYNC_STORE_KEY);
          if (storeConfigJSON) {
            defaultSettings = JSON.parse(storeConfigJSON);
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
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColorLowOpacity }}>
        {!fontsLoaded || isVisibleCustomSplashScreen ? <CustomSplashScreen /> : null}
        {/*TODO Remove onboarding */}
        {fontsLoaded && !isVisibleCustomSplashScreen && isOnBoarding ? <AppContextWrapper defaultSettings={defaultSettings}><OnBoard onEnd={() => setIsOnBoarding(false)}/></AppContextWrapper> : null}
        {fontsLoaded && !isVisibleCustomSplashScreen && !isOnBoarding
            ? (<AppContextWrapper defaultSettings={defaultSettings}><Layout><Navigation /></Layout></AppContextWrapper>)
            : null}
    </View>
  );
};
