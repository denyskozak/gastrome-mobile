import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

import { fonts } from './styles/fonts';

import { AppContextWrapper } from './AppContextWrapper';
// import { OnBoard, useIsOnBoarding } from './components/molecular/on-boarding/on-boarding.component';
import { SplashScreen as CustomSplashScreen } from './components/molecular/splash-screen/splash-screen.component';
import { delayForPromise } from './utilities/promiseDelay';

SplashScreen.preventAutoHideAsync().then().catch(() => console.log('error-splash-prevent-auto-hide'));

export const App = () => {
  const [fontsLoaded] = useFonts(fonts);
  // const [appIsReady, setAppIsReady] = useState(false);
  // const [isOnBoarding, setIsOnBoarding] = useIsOnBoarding();
  const [isVisibleCustomSplashScreen, setVisibleCustomSplashScreen] = useState(true);

  useEffect(() => {
    if (fontsLoaded) {
      try {
        (async () => {
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
      {!fontsLoaded || isVisibleCustomSplashScreen ? <CustomSplashScreen/> : null}
      {/*TODO Remove onboarding */}
      {/*{fontsLoaded && !isVisibleCustomSplashScreen && isOnBoarding ? <OnBoard onEnd={() => setIsOnBoarding(false)}/> : null}*/}
      {fontsLoaded && !isVisibleCustomSplashScreen ? <AppContextWrapper/> : null}
    </View>
  );
};
