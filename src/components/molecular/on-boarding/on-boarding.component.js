import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from 'react-native-onboarding-swiper';
import styles from './on-boarding.styles';
import { isFirstLaunch } from '../../../utilities/isFirstLaunch';
import { Colors } from '../../../styles/colors';
import { Animation } from '../../atomic/animation/animation.component';
import { HAS_BEEN_ONBOARDED_KEY } from '../../../constants/asyncStoreKeys';
import { getDevice } from '../../../utilities/getCurrentDevice';
import {useTranslator} from "../../../hooks/useTranslator";


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
  const [t] = useTranslator('components.onboard')
   const close = () => {
    onEnd instanceof Function ? onEnd() : null;
    AsyncStorage.setItem(HAS_BEEN_ONBOARDED_KEY, 'false');
  };

  const animationSizes = {
    iPhone: [
      [300, 250],
      [300, 250],
      [150, 120],
    ],
    iPad: [
      [600, 500],
      [600, 500],
      [300, 240],
    ],
  };
  const pages = [
    {
      backgroundColor: Colors.backgroundColor,
      animationName: 'cooking',
      title: t('firstTitle'),
      subtitle: t('firstSubtitle'),
    },
    {
      backgroundColor: Colors.backgroundColor,
      animationName: 'happyAutumnShopping',
      title: t('secondTitle'),
      subtitle: t('secondSubtitle'),
    },
    {
      backgroundColor: Colors.backgroundColor,
      animationName: 'voice',
      title: t('thirdTitle'),
      subtitle: t('thirdSubtitle'),
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