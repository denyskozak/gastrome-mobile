import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Image, Text, View, Share } from 'react-native';
import Voice from '@react-native-voice/voice';
import * as Speech from 'expo-speech';
import Icon from '@expo/vector-icons/Ionicons';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

import { Animated } from '../../components/atomic/animated/animated.component';
import { useTranslator } from '../../hooks/useTranslator';
import { Button } from '../../components/atomic/button/button.component';
import { Spaces } from '../../styles/spaces';
import { Modal } from '../../components/atomic/modal/modal.component';
import { getVoiceOneWord } from '../../utilities/getVoiceOneWord';
import { voiceLanguage } from '../../constants/voice';
import { PermissionModal } from '../../components/templates/permission-modal/permission-modal.component';
import { useSpeechProfile } from '../../contexts/speechProfile.context';
import { useMenuCart } from '../../contexts/cart.context';
import { useCommonModal } from '../../contexts/commonModal/commonModal.context';
import { renderIngredient } from './recipe.renders';
import { CountryList } from '../../components/atomic/country-flag/country-flag.list';
import { CountryFlag } from '../../components/atomic/country-flag/country-flag.component';
import { FirstLaunchTooltip } from '../../components/molecular/first-launch-tooltip/first-launch-tooltip.component';
import { CART_ICON_RECIPE_PAGE_KEY } from '../../constants/asyncStoreKeys';
import { Animation } from '../../components/atomic/animation/animation.component';
import { VoiceButton } from './components/voice.button/voice.button.component';

import styles from './recipe.styles';
import {useRecipes} from "../../hooks/useRecipes";

const RecipePageComponent = (props) => {
  const {
    navigation,
    route: {params: {id}},
  } = props;

  const [recipes] = useRecipes();
  const recipe = recipes.find(item => item.id === id);
  const {
    title,
    image,
    subTitle,
    description,
    ingredients,
    time,
    steps,
    region,
    filters,
    level,
    servings,
  } = recipe;

  const [t] = useTranslator('pages.recipe');
  const [speechProfile] = useSpeechProfile();
  const [, addCartItems] = useMenuCart();

  const stepRefs = {};
  const [flatListRef, setFlatListRef] = useState({});
  const [targetStep, setTargetStep] = useState(null);
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [existsInCart, setExistsInCart] = useState(false);
  const [servingsCount, setServingsCount] = useState(servings);
  const [openCommonModal] = useCommonModal();
  const [isListening, setListening] = useState(false);
  const [isFirstAssistantRun, setFirstAssistantRun] = useState(true);

  const recipeCountry = useMemo(() => {
    return filters.find(item => CountryList.includes(item));
  }, [filters]);

  const readText = async (step) => {
    if (await Speech.isSpeakingAsync()) return;
    Speech.speak(`${steps[step].description}, Wait your command`, {
      language: 'en', rate: 0.8, voice: speechProfile, onDone: () => {
        (async () => {
          await Voice.start(voiceLanguage);
        })();
      }
    })
  };

  const scrollToStep = (step) => {
    if (flatListRef.scrollToIndex) {
      flatListRef.scrollToIndex({
        animated: true,
        index: step,
        viewPosition: 0,
      })
    }
  };

  const readAndRunToStep = async (step) => {
    await Voice.stop();
    await Voice.destroy()
    scrollToStep(step);
    setTargetStep(step);
    await readText(step);
  }

  const startVoiceUsage = async () => {
    if (isListening) {
      await Voice.stop();
      await Speech.stop();
      setTargetStep(null);
    } else {
      await readAndRunToStep(0);
    }
    setListening(!isListening);
  }

  useFocusEffect(
    useCallback(() => {
      Voice.onSpeechPartialResults = async ({value}) => {
        const command = getVoiceOneWord(value[0]);

        if (command === 'next') {
          if (targetStep === steps.length - 1) return;
          const step = Number.isInteger(targetStep) ? targetStep + 1 : 0;
          await readAndRunToStep(step);
        }

        if (command === 'back') {
          if (targetStep === 0) return;
          const step = Number.isInteger(targetStep) ? targetStep - 1 : 0;
          await readAndRunToStep(step);
        }

        if (command === 'repeat') {
          await readText(targetStep);
        }
      };
    }, [targetStep])
  );

  useEffect(() => {
    navigation.addListener('blur', async () => {
      await Voice.destroy();
    });
  }, []);

  const prepareIngredient = item => ({...item, key: item.title, quantity: item.quantity * (servingsCount / servings)});

  const handleAddToCart = () => {
    if (!existsInCart) {
      addCartItems(recipe.ingredients.map(prepareIngredient));
      setExistsInCart(true);
      openCommonModal({
        icon: 'checkmark-done-outline',
        title: t('addedToCartTitle', {name: title}),
        text: t('addedToCartText'),
      });
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I like to share ${title} recipe, ingredients: \n\n${ingredients.map(item => renderIngredient(item)).join(', \n')}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ref={ref => setFlatListRef(ref)}
        ListHeaderComponent={
          <>
            {/* Image section */}
            <View style={styles.timeContainer}>
              <Text>
                <Icon name="time-outline" size={14}/>
                {'  '}
                {t('time', {time})}
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
              {recipeCountry && <View style={styles.flag}><CountryFlag name={recipeCountry}/></View>}
            </View>


            <Animated delay={250} duration={750}>
              <Image src={image} style={styles.image} sharedTransitionTag={`recipe-${id}`}/>
            </Animated>

            {/* Ingredients and description */}
            <View style={styles.ingredientsContainer}>
              <View style={styles.actionsContainer}>
                {level && <Text style={styles.level}>{t('level')}: {level}</Text>}
                <View style={styles.actions}>
                  <FirstLaunchTooltip
                    asyncStoreKey={CART_ICON_RECIPE_PAGE_KEY}
                    text={t('cartOnBoard')}
                  >
                    <Button
                      disabled={Boolean(existsInCart)}
                      style={styles.action}
                      type="outlined"
                      onPress={handleAddToCart}
                    >
                      <Icon name={!existsInCart ? 'cart-outline' : 'checkmark-outline'} size={Spaces.large}/>
                    </Button>
                  </FirstLaunchTooltip>
                  <Button
                    style={styles.action}
                    type="outlined"
                    onPress={handleShare}
                  >
                    <Icon name="share-outline" size={Spaces.large}/>
                  </Button>
                </View>
              </View>
              {region && <Text style={styles.region}>{t('region')}: {region}</Text>}
              {subTitle && <Text style={styles.sub}>{subTitle}</Text>}
              {description && <Text style={styles.description}>{description}</Text>}
              {/*Ingredients:*/}
              {servingsCount && (
                <Text style={styles.servings}>
                  {t('servings', {count: servingsCount})}
                  {' '}
                  <Button
                    type="outlined"
                    size="s"
                    onPress={() => {
                      if (servingsCount > servings) {
                        setServingsCount(servingsCount / 2);
                      }
                    }}
                  >
                    <Icon name="remove-circle-outline" size={14}/>
                  </Button>
                  {' '}
                  <Button
                    type="outlined"
                    onPress={() => {
                      if (servingsCount < 50) {
                        setServingsCount(servingsCount * 2);
                      }
                    }}
                    size="s"
                  >
                    <Icon name="add-circle-outline" size={14}/>
                  </Button>
                </Text>
              )}
              <FlatList
                style={styles.ingredients}
                data={ingredients.map(prepareIngredient)}
                keyExtractor={({id, title}) => id + title}
                ListHeaderComponent={<Text style={styles.ingredientLabel}>Ingredients:</Text>}
                renderItem={({item}) => (
                  <Text style={styles.ingredient}>
                    {renderIngredient(item)}
                  </Text>
                )}
              />
            </View>
          </>
        }
        data={steps}
        // @TODO replace on id when API is ready */
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) => {
          const {title, description, image} = item;

          return (
            <View style={styles.step} onLayout={event => {
              const layout = event.nativeEvent.layout;
              stepRefs[index] = layout.y;
            }}>
              <Text style={styles.stepTitle}>
                &nbsp;
                <Text style={[
                  styles.stepName,
                  targetStep === index ? styles.underline : null
                ]}>
                  {t('step', {number: index + 1})}
                </Text>
                {title ? `. ${title}` : ''}
              </Text>
              {description && <Text style={styles.stepDescription}>{description}</Text>}
              {image && <Image style={styles.stepImage} source={{uri: image}}/>}
            </View>
          );
        }}
      />

      {/* Voice assistant */}
      <VoiceButton
        isListening={isListening}
        startText={t('startVoice')}
        onButtonPress={async () => {
          const {status} = await Audio.requestPermissionsAsync();
          if (status !== 'granted') {
            setPermissionModalVisible(true);
          }

          if (isFirstAssistantRun) {
            setHelpModalVisible(true);
            setFirstAssistantRun(false);
          } else {
            await startVoiceUsage();
          }
        }}
      />

      {/* Voice assistant helper */}
      <Modal isVisible={helpModalVisible} onChangeVisible={setHelpModalVisible}>
        <Animation name="micro" width={100} height={150}/>
        <Text style={styles.helpModalText}>{t('assistantCommands')}</Text>
        <Button
          type="outlined"
          style={styles.helpModalButton}
          onPress={() => {
            setHelpModalVisible(false);

            setTimeout(() => {
              try {
                (async () => {
                  await startVoiceUsage();
                })()
              } catch (e) {
                alert(e);
              }
            }, 1000);
          }}
          title={t('start')}
        />
      </Modal>
      <PermissionModal
        isVisible={permissionModalVisible}
        onChangeVisible={setPermissionModalVisible}
        onPress={
          async () => {
            const {status} = await Audio.requestPermissionsAsync();
            if (status === 'granted') {
              await startVoiceUsage();
            }

            setPermissionModalVisible(false);
          }
        }
      />
    </View>
  );
};

export const RecipePage = RecipePageComponent;
