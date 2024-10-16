import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Onboarding from 'react-native-onboarding-swiper';
import styles from './on-boarding.styles';
import { isFirstLaunch } from '../../../utilities/isFirstLaunch';
import { Colors } from '../../../styles/colors';
import { Animation } from '../../atomic/animation/animation.component';
import { HAS_BEEN_ONBOARDED_KEY } from '../../../constants/asyncStoreKeys';
import { getDevice } from '../../../utilities/getCurrentDevice';


export const useIsOnBoarding = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const isFirst = await isFirstLaunch(HAS_BEEN_ONBOARDED_KEY);
      setIsOpen(isFirst);
    })();
  }, [])

  return [isOpen, setIsOpen];
}

export const OnBoard = ({onEnd}) => {
  const close = () => {
    onEnd instanceof Function ? onEnd() : null;
    AsyncStorage.setItem(HAS_BEEN_ONBOARDED_KEY, 'false');
  };

  const animationSizes = {
    iPhone: [
      [300, 250],
      [150, 120],
      [300, 250],
      [300, 250],
    ],
    iPad: [
      [600, 500],
      [300, 240],
      [600, 500],
      [600, 500],
    ],
  };
  const pages = [
    {
      backgroundColor: Colors.backgroundColor,
      animationName: 'cooking',
      title: 'Bonjour, Bem-vindo, Benvenuto!',
      subtitle: 'Welcome to Open-beta exquisite culinary universe, an app designed to tantalize your taste buds with flavors from across the globe. Savour the timeless delights of Italy, Portugal, Spain...',
    },
    {
      backgroundColor: Colors.backgroundColor,
      animationName: 'voice',
      title: 'Meet your new Sous-Chef, our state-of-the-art AI assistant',
      subtitle: 'Cooking can be messy, but our assistant ensures it\'s a breeze. Guiding you through each step of your chosen recipe, it lets you keep your focus on the flavors and your hands free from your device',
    },
    {
      backgroundColor: Colors.backgroundColor,
      animationName: 'cookingFood',
      title: 'No more frantic notes or last-minute shopping trips! ',
      subtitle: 'Our app comes with an ingenious feature that lets you vocally list out your ingredients. Simply mention what\'s in your pantry or what you need for a particular dish, and our app will keep track',
    },
    {
      backgroundColor: Colors.backgroundColor,
      animationName: 'happyAutumnShopping',
      title: 'Say goodbye to the chaos of grocery lists with our virtual shopping cart',
      subtitle: ' Select a recipe, and with a single tap, all the ingredients you need are automatically added to your cart. Explore the aisles of your favorite grocery store with confidence, knowing you have everything you need to create your culinary masterpiece right in your pocket',
    },
  ].map((page, index) => {
    const [width, height] = animationSizes[getDevice()][index];
    return {
      ...page,
      image: (<Animation name={page.animationName} width={width} height={height} />)
    };
  });

  // key for re-render after closing
  return (
      <Onboarding
        containerStyles={styles.container}
        titleStyles={styles.title}
        subTitleStyles={styles.subTitle}
        onSkip={close}
        onDone={close}
        bottomBarColor={Colors.backgroundColor}
        pages={pages}
      />
  )
}