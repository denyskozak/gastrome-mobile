import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';

import {
  recipesPageRoute,
} from '../../navigation/navigation.routes';
import { useTranslator } from '../../hooks/useTranslator';
import { Button } from '../../components/atomic/button/button.component';
import { useMenuDarkMode } from '../../contexts/menuDarkMode.context';

import { Colors } from '../../styles/colors';
// import { Modal } from '../../components/molecular/modal/modal.component';
// import { Spaces } from '../../styles/spaces';

import { Animated } from '../../components/atomic/animated/animated.component';
import styles from './welcome.styles';
import Icon from '@expo/vector-icons/Ionicons';
import { Spaces } from '../../styles/spaces';
import { RecipesGenerator } from './recipesGenerator/recipes-generator';
import { recipeRoute } from './navigation/welcome.routes';
import { downloadAsync } from '../../utilities/downloadAsync';
import { sortRecipes } from '../recipes/recipes.sortings';
import {getDevice, isIPhoneLowerX} from '../../utilities/getCurrentDevice';
import { AttentionAnimation } from '../../components/molecular/attansion-animation/attansion-animation.component';
import {useRecipes} from "../../hooks/useRecipes";

const videoSources = [
  require('./assets/1.mp4'),
  require('./assets/2.mp4'),
  require('./assets/3.mp4'),
  require('./assets/4.mp4'),
  require('./assets/5.mp4'),
];

const WelcomePageComponent = (props) => {
  const {navigation} = props;

  const [t] = useTranslator('pages.welcome');
  const [recipes] = useRecipes();

  const [, setModalVisible] = useState(false);
  const [isVideoCover, setIsVideoCover] = useState(false);
  const [, setMenuDarkMode] = useMenuDarkMode();
  const containerScrollViewRef = useRef(null);

  useEffect(() => {
    const recipes = sortRecipes(recipes);

    // Preload 2 first images for recipes page
    recipes.slice(0, 2).map(item => {
      downloadAsync(item.image || '').catch(() => {
        console.log('Error downloading first two recipe images');
      })
    });

    // Manipulate welcome video for lower than X iphone's
    setIsVideoCover(isIPhoneLowerX() || getDevice() === 'iPad');
  }, [recipes]);

  const basicFadeInDelay = 1500;
  const stepAnimationDelay = 250;

  const getAnimationDelay = (steps = 1) => basicFadeInDelay + (steps * stepAnimationDelay)

  useEffect(() => {
    window.setTimeout(() => {
      setModalVisible(true);
    }, 2000);

    const unsubscribeFocus = navigation.addListener('focus', (e) => {
      setMenuDarkMode(false);
    });
    const unsubscribeBlur = navigation.addListener('blur', (e) => {
      setMenuDarkMode(true);
    });
    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  const randomVideoSourceIndex = useMemo(() => (
    Math.floor(Math.random() * videoSources.length)
  ), []);

  const animationDelays = useMemo(() => ({
    title: getAnimationDelay(1),
    subTitle: getAnimationDelay(2),
    exploreButton: getAnimationDelay(3),
    downChevron: getAnimationDelay(4),
    exploreButtonResizing: getAnimationDelay(6)
  }), []);

  return (
    <ScrollView ref={containerScrollViewRef}>
      <View style={styles.pageContainer}>
        <View style={styles.videoLayer}/>
        <Video
          isLooping
          isMuted
          resizeMode={isVideoCover ? 'cover' : 'contain'}
          useNativeControls={false}
          shouldPlay
          source={videoSources[randomVideoSourceIndex]}
          style={styles.video}
        />
        {/*Middle text*/}

        <View style={styles.text}>
          <Animated delay={animationDelays.title}>
            <Text style={styles.title}>{t('title')}</Text>
          </Animated>
          <Animated delay={animationDelays.subTitle}>
            <Text style={styles.subTitle}>{t('subTitle')}</Text>
          </Animated>
          <View style={styles.letGoButtonContainer}>
            <Animated delay={animationDelays.exploreButton} duration={800} name="BounceIn">
              <AttentionAnimation delay={animationDelays.exploreButtonResizing}>
                <Button
                  type="outlined"
                  style={styles.letGoButton}
                  textStyle={styles.letGoButtonText}
                  onPress={() => {
                    navigation.navigate(recipesPageRoute)
                  }}
                  title={t('tryIt')}
                />
              </AttentionAnimation>
            </Animated>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (containerScrollViewRef && containerScrollViewRef.current && containerScrollViewRef.current.scrollTo instanceof Function) {
              containerScrollViewRef.current.scrollToEnd();
            }
          }}
          style={styles.scrollDown}>
          <Animated style={styles.scrollDownButton} delay={animationDelays.downChevron} duration={1000}>
            <Icon name="chevron-down-outline" size={Spaces.xxlarge} color={Colors.second}/>
            <Text style={styles.scrollDownText}>{t('generator')}</Text>
          </Animated>
        </TouchableOpacity>

        {/*todo move to single component*/}
        {/*<Modal isVisible={modalVisible} onChangeVisible={setModalVisible}>*/}
        {/*  <Icon name="restaurant-outline" size={Spaces.xxlarge}/>*/}

        {/*  /!*TODO replace translate*!/*/}
        {/*  <Text style={styles.modalTitle}>*/}
        {/*    Welcome to Gastro&Me!*/}
        {/*  </Text>*/}
        {/*  <Text style={styles.modalText}>*/}
        {/*    The ultimate cooking app with AI based smart assistant designed to help you cook delicious meals in no time (Beta version)*/}
        {/*  </Text>*/}
        {/*  <Text style={styles.modalText}>*/}
        {/*    You could use AI-assistant on a recipe page*/}
        {/*  </Text>*/}
        {/*  <Button*/}
        {/*    type="outlined"*/}
        {/*    style={styles.modalButton}*/}
        {/*    onPress={() => {*/}
        {/*      setModalVisible(false);*/}
        {/*    }}*/}
        {/*    title="Start"*/}
        {/*  />*/}
        {/*</Modal>*/}
      </View>
      <View style={styles.pageContainer}>
        <View style={styles.pageContent}>
          <RecipesGenerator
            onRecipePress={id => {
              // Fix for position: absolute in navigation.styles for tabBarStyle dark mode
              setMenuDarkMode(true);
              setTimeout(() => {
                navigation.navigate(recipeRoute, {id});
              })
            }}/>
        </View>
      </View>
    </ScrollView>
  );
};

WelcomePageComponent.propTypes = {};

export const WelcomePage = WelcomePageComponent;