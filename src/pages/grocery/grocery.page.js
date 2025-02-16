import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Voice from '@react-native-voice/voice';
import { Audio } from 'expo-av';

import Icon from '@expo/vector-icons/Ionicons';
import _ from 'lodash';

import { Button } from '../../components/atomic/button/button.component';
import { useTranslator } from '../../hooks/useTranslator';
import { Input } from '../../components/atomic/input/input.component';
import { VoiceButton } from '../recipe/components/voice.button/voice.button.component';

import { getIngredientsMock } from '../../mock/ingredients';

import { Spaces } from '../../styles/spaces';
import { PermissionModal } from '../../components/templates/permission-modal/permission-modal.component';
import { useSearchByIngredients } from '../../contexts/searchByIngredients.context';
import { sortIngredients } from './grocery.utilities';
import { Animated } from '../../components/atomic/animated/animated.component';
import { IntroVideoModal } from '../../components/organismic/intro-video-modal/intro-video-modal';

import styles from './grocery.styles';
import { HelpButton } from '../../components/molecular/help-button/help-button';
import { recipesPageRoute } from '../../navigation/navigation.routes';
import { recipesRoute } from '../recipes/navigation/recipes.routes';
import {useSubscriptions} from "../../contexts/subscriptions.context";

const intoVideo = require('./grocery-instruction-video.mp4');

const GroceryPageComponent = (props) => {
  const {
    navigation,
  } = props;

  const [t,, language] = useTranslator('pages.grocery');
  const [isSubscriber] = useSubscriptions();

  // Voice select
  const [isListening, setListening] = useState(false);
  const [addedIngredients, setAddedIngredients] = useState([]);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  const [voiceTooltipText, setVoiceTooltipText] = useState('');
  const voiceAnimationRef = useRef(null);
  const flatGridRef = useRef(null);

  // Search
  const [searchedIndexes, setSearchedIndexes] = useState([]);
  const [searchText, setSearchText] = useState('');

  // List
  const [selected, setSelected] = useState(new Set());
  const [isConfirmReady, setConfirmReady] = useState(false);
  const [, setSearchByIngredients] = useSearchByIngredients();

  const setAddedIngredient = useCallback((name) => setVoiceTooltipText(t('addedIngredient', {name})), [])
  const ingredients = useMemo(() =>
      getIngredientsMock(!isSubscriber, language)
        .sort(sortIngredients)
        .map(({title}) => title.toLocaleLowerCase()),
    [!isSubscriber, language]
  );

  const ingredientNamesSet = useMemo(() => (
    ingredients.reduce((set, name) => {
      set.add(String(name).toLowerCase());
      return set
    }, new Set())
  ), [ingredients]);

  // For render
  const items = useMemo(() =>
      getIngredientsMock(!isSubscriber, language)
        .map((item) => {
          item.selected = selected.has(item.title);
          return {...item};
        }).sort(sortIngredients),
    [selected, !isSubscriber, language]);

  const searchedItems = useMemo(() => searchedIndexes.map(index => items[index]), [searchedIndexes, items])

  const addVoiceListeners = useCallback(() => {
    let isVoiceAnimationInProcess = false;
    let selectedIngredient = new Set();

    Voice.onSpeechPartialResults = (event) => {
      if (!isVoiceAnimationInProcess) {
        isVoiceAnimationInProcess = true;
        voiceAnimationRef.current?.play?.();
        setTimeout(() => {
          voiceAnimationRef.current?.pause?.();
          isVoiceAnimationInProcess = false;
        }, 1000);
      }

      if (event && event.value && _.isString(event.value[0])) {
        const words = event.value[0].split(' ');
        const lastWord = String(words[words.length - 1]).toLowerCase();
        const last2Words = String(`${words[words.length - 2]} ${words[words.length - 1]}`).toLowerCase();

        let maybeIngredient = ingredientNamesSet.has(last2Words)
          ? last2Words
          : undefined;

        if (maybeIngredient === undefined) {
          maybeIngredient = ingredientNamesSet.has(lastWord) ? lastWord : undefined;
        }

        if (maybeIngredient === undefined) return;
        selectedIngredient.add(maybeIngredient);
        setAddedIngredient(maybeIngredient);

        const index = ((searchText ? searchedItems : items) || []).findIndex(({ title }) => String(title).toLocaleLowerCase() === maybeIngredient);
        if (index > -1 && flatGridRef && flatGridRef.current && _.isFunction(flatGridRef.current.scrollToIndex)) {
          flatGridRef.current.scrollToIndex({
            index,
            viewPosition: 0.5
          })
        }
        setAddedIngredients(Array.from(selectedIngredient));
      }
    }

    Voice.onSpeechStart = () => {
      selectedIngredient = new Set();
    };

    Voice.onSpeechEnd = (() => {
      selectedIngredient = new Set();
    });
  }, []);

  // Ingredients search voice handler
  useEffect(() => {
    addVoiceListeners();

    const unsubscribeFocus = navigation.addListener('focus', addVoiceListeners);

    const unsubscribeBlur = navigation.addListener('blur', async () => {
      // Clear my handlers straight forward
      await Voice.destroy();
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    }
  }, [addVoiceListeners]);

  // Confirm button animation
  useEffect(() => {
    if (selected.size > 1 && !isConfirmReady) {
      setConfirmReady(true);
    }

    if (selected.size < 2 && isConfirmReady) {
      setConfirmReady(false);
    }
  }, [selected]);


  useEffect(() => {
    const uniqueSet = new Set([...selected, ...addedIngredients]);
    setSelected(uniqueSet);
  }, [addedIngredients]);

  useEffect(() => {
    setSelected(new Set());
  }, [isSubscriber, language]);

  const runListening = async () => {
    if (isListening) {
      await Voice.stop();
      // Stop icon jumps
      setListening(!isListening);
    } else {
      const {status} = await Audio.requestPermissionsAsync();
      const isVoiceRecognizationAvailable = await Voice.isAvailable();

      if (status === 'granted' && isVoiceRecognizationAvailable === 1) {
        await Voice.start(language);
        setListening(!isListening);
      } else {
        setPermissionModalVisible(true);
      }
    }
  };

  const renderItem = ({item: {title}, index}) => {
    const lowerCaseTitle = String(title).toLocaleLowerCase();
    return (
      <Button
        onPress={() => {
          const newSet = new Set([...selected]);
          if (newSet.has(lowerCaseTitle)) {
            newSet.delete(lowerCaseTitle);
          } else {
            newSet.add(lowerCaseTitle);
          }

          setSelected(newSet);
        }}
        type="outlined"
        selected={selected.has(lowerCaseTitle)}
        style={styles.itemContainer}
        key={title + index}
      >
        {selected.has(lowerCaseTitle) && (<Icon name="checkmark-outline" size={Spaces.medium}/>)}
        {title}
      </Button>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Search */}
        <Input
          style={styles.search}
          placeholder={t('search')}
          editable={!isListening}
          onChange={value => {
            setSearchText(value);

            setSearchedIndexes(
              items.reduce((acc, item, index) => {
                  if (item.title.includes(value)) {
                    acc.push(index);
                  }

                  return acc;
                },
                [],
              )
            );
          }}
          value={searchText}
        />
        {/* List of ingredients */}
        <Animated delay={500} name="FadeIn">
          <FlatGrid
            spacing={10}
            itemDimension={200}
            ref={flatGridRef}
            contentContainerStyle={styles.itemsContainer}
            data={searchText ? searchedItems : items}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={styles.notFound}>{t('notFound')}</Text>}
          />
        </Animated>

        {/* Confirm button */}
        {isConfirmReady && !isListening && (
          <View style={styles.confirmButtonBackground}>
            <Animated name="BounceInDown">
              <Button
                style={styles.confirmButton}
                textStyle={styles.confirmText}
                type="contained"
                onPress={() => {
                  if (isConfirmReady) {
                    setSearchByIngredients([...selected]);
                    navigation.navigate(recipesPageRoute, {screen: recipesRoute})
                  }
                }}
                title={t('confirmText')}
              />
            </Animated>
          </View>
        )}
      </View>

      {/* Voice assistance */}
      <VoiceButton
          hideButtonWhenSpeaking={true}
          isListening={isListening}
          isUpper
          animationRef={voiceAnimationRef}
          a
          voiceTooltipText={voiceTooltipText}
          lootieName="voice"
          autoPlay={false}
          startText={t('startVoice')}
          onButtonPress={() => {
            (async () => {
              setSearchText('');
              await runListening();
              setVoiceTooltipText(t('tellUs'));
            })();
          }}
      />
      {/* OnBoarding modal */}
      <IntroVideoModal isOpen={isHelpModalOpen} onChangeVisible={setHelpModalOpen} title={t('howItWorks')}
                       source={intoVideo}/>
      {/* Help button*/}
      <HelpButton onPress={() => {
        setHelpModalOpen(true)
      }}/>

      {/* Permission modal */}
      <PermissionModal
        isVisible={permissionModalVisible}
        onChangeVisible={setPermissionModalVisible}
        onPress={
          async () => {
            const {status} = await Audio.requestPermissionsAsync();
            if (status === 'granted') {
              await Voice.start(language);
              setListening(!isListening);
            }

            setPermissionModalVisible(false);
          }
        }
      />
    </SafeAreaView>
  );
};

export const GroceryPage = GroceryPageComponent;