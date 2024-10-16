import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, Image, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import _ from 'lodash';

import { Animated } from '../../components/atomic/animated/animated.component';
import { useTranslator } from '../../hooks/useTranslator';
import { Button } from '../../components/atomic/button/button.component';
import { Spaces } from '../../styles/spaces';
import { useMenuCart } from '../../contexts/cart.context';
import { useCommonModal } from '../../contexts/commonModal/commonModal.context';
import { renderIngredient } from './recipe.renders';
import { CountryList } from '../../components/atomic/country-flag/country-flag.list';
import { CountryFlag } from '../../components/atomic/country-flag/country-flag.component';
import { authorRoute, cookingRoute } from '../recipes/navigation/recipes.routes';
import { Colors } from '../../styles/colors';
import { cartPageRoute } from '../../navigation/navigation.routes';
import { useFavorites } from '../../contexts/favorites.context';
import { useSettings } from '../../contexts/settings.context';
import { MeasureModal } from '../../components/templates/measure-modal/measure-modal.component';
import { handleSocialShare } from '../../utilities/socialShare';
import { AttentionAnimation } from '../../components/molecular/attansion-animation/attansion-animation.component';
import { downloadAsync } from '../../utilities/downloadAsync';
import { useAWS } from '../../hooks/useAWS';

import styles from './recipe.styles';
import {useRecipes} from "../../hooks/useRecipes";
import {AuthorPreview} from "../../components/molecular/author-preview/author-preview";

const RecipePageComponent = (props) => {
  const {
    navigation, route: {params: {id}},
  } = props;

  const [t] = useTranslator('pages.recipe');

  const [recipes] = useRecipes();
  const recipe = useMemo(() => recipes.find(item => item.id === id), [id, recipes]);
  const {
    title,
    image,
    subTitle,
    tip,
    description,
    ingredients,
    time,
    steps,
    region,
    filters = [],
    level,
    servings,
    iconColor = 'black',
    author
  } = recipe;

  const {getCookingStepURL} = useAWS();

  const [, addCartItems] = useMenuCart();
  const [favorites, setLike] = useFavorites();
  const [settings, setSetting] = useSettings();
  const [existsInCart, setExistsInCart] = useState(false);
  const [visibleCookingLink, setVisibleCookingLink] = useState(false);
  const [isMeasureModalOpen, setIsMeasureModalOpen] = useState(false);
  const [servingsCount, setServingsCount] = useState(servings);
  const [openCommonModal] = useCommonModal();

  const stepRefs = {};
  const {measure} = settings;
  const [isPreloadVideo, setIsPreloadVideo] = useState(false);

  useEffect(() => {
    downloadAsync(getCookingStepURL(id, 1))
      .then(() => setIsPreloadVideo(true))
      .catch(() => console.log('Error first step video preload: '));
  }, []);

  const recipeCountry = useMemo(() => {
    return filters.find(item => CountryList.includes(item));
  }, [filters]);

  const debounceChangeCookingLinkState = useMemo(() => _.debounce(function (value) {
    setVisibleCookingLink(typeof value === 'number' && value > 150);
  }, 50), [setVisibleCookingLink]);

  const prepareIngredient = item => ({
    ...item, key: item.title, quantity: item.quantity * (servingsCount / servings),
  });

  const handleAddToCart = () => {
    if (!existsInCart) {
      addCartItems(recipe.ingredients.map(prepareIngredient));
      setExistsInCart(true);
      openCommonModal({
        icon: 'checkmark-done-outline',
        title: t('addedToCartTitle', {name: title}),
        text: t('addedToCartText'),
        secondButton: {
          text: t('cartButton'), onPress: () => navigation.navigate(cartPageRoute),
        }
      });
    }
  };

  const handleShare = async () => {
    try {
      const ingredientsList = ingredients.map(item => renderIngredient(item, measure)).join(', \n');
      await handleSocialShare(
        `I like to share ${title} recipe, ingredients: \n\n${ingredientsList}`);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLikePress = () => {
    setLike(id);
  };

  const handleScroll = (event) => {
    const y = event?.nativeEvent?.contentOffset?.y;
    debounceChangeCookingLinkState(y);
  };

  return (<View style={styles.container}>
    <FlatList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<>
        {/* Image section */}
        <View style={styles.timeContainer}>
          <Text>
            <Icon name="time-outline" size={14}/>
            {'  '}
            {t('time', {time})}
            {' - '}
            {level}
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {recipeCountry && <View style={styles.flag}><CountryFlag name={recipeCountry}/></View>}
        </View>

        <Pressable onPress={() => navigation.push(cookingRoute, {id})}>
          <Animated delay={250} duration={750}>
            <Image source={image} style={styles.image}/>
            {isPreloadVideo && (
              <Animated style={styles.imageIcon} outName="FadeOut" duration={800}>
                <AttentionAnimation delay={200} duration={1200} start={0.5} end={1} property="opacity">
                  <Icon name={'play-circle'} color={Colors[iconColor]}
                        size={Spaces.xxlarge * 2}/>
                </AttentionAnimation>
              </Animated>
            )}
          </Animated>
        </Pressable>

        {/* Ingredients and description */}
        <View style={styles.ingredientsContainer}>
          <View style={styles.actionsContainer}>
            {/*{viewed && <Text style={styles.viewed}>{t('viewed')}: {viewed} <Icon name={'eye-outline'}*/}
            {/*                                                                     size={Spaces.medium}/></Text>}*/}
            <View style={styles.actions}>
              <Button
                style={styles.action}
                type="outlined"
                onPress={handleLikePress}
              >
                <Icon name={favorites.includes(id) ? 'bookmark' : 'bookmark-outline'} size={Spaces.large}/>
              </Button>

              <Button
                disabled={Boolean(existsInCart)}
                style={styles.action}
                type="outlined"
                onPress={handleAddToCart}
              >
                <Icon name={!existsInCart ? 'cart-outline' : 'checkmark-outline'} size={Spaces.large}/>
              </Button>
              <Button
                style={styles.action}
                type="outlined"
                onPress={handleShare}
              >
                <Icon name="paper-plane-outline" size={Spaces.large}/>
              </Button>
            </View>
          </View>
          {author && (
              <Pressable onPress={() => navigation.navigate(authorRoute, { id: author.id })}>
                <AuthorPreview name={author.name} imageSource={author.image} />
              </Pressable>
          )}
          {region && <Text style={styles.region}>{t('region')}: {region}</Text>}
          {subTitle && <Text style={styles.sub}>{subTitle}</Text>}
          {description && <Text style={styles.description}>{description}</Text>}
          {tip && <Text style={styles.tip}>{tip}</Text>}

          {/*Ingredients:*/}

          <FlatList
            style={styles.ingredients}
            data={ingredients.map(prepareIngredient)}
            keyExtractor={({id, title}) => id + title}
            ListHeaderComponent={<Text style={styles.ingredientLabel}>{t('ingredients')}:</Text>}
            ListFooterComponent={<View style={styles.ingredientHeader}>
              <Button
                type="outlined"
                size="l"
                onPress={() => {
                  setIsMeasureModalOpen(true);
                }}
              >
                {t('chooseMeasure')}
              </Button>
              {servingsCount && (
                <View>
                  <Text style={styles.servings}>
                    {t('servings', {count: servingsCount})}
                  </Text>
                  <View style={styles.servingsButtons}>
                    <Button
                      type="outlined"
                      size="m"
                      onPress={() => {
                        if (servingsCount > servings) {
                          setServingsCount(servingsCount / 2);
                        }
                      }}
                    >
                      <Icon name="remove-circle-outline" color={Colors.black} size={20}/>
                    </Button>

                    <Button
                      type="outlined"
                      onPress={() => {
                        if (servingsCount < 50) {
                          setServingsCount(servingsCount * 2);
                        }
                      }}
                      size="m"
                    >
                      <Icon name="add-circle-outline" color={Colors.black} size={20}/>
                    </Button>
                  </View>
                </View>
              )}
              {/*TODO Its dubplicate of "Add to cart" function, Return if needed*/}
              {/*{!existsInCart && (<Text style={styles.addToCardText}>*/}
              {/*  {t('addToCart')}*/}
              {/*</Text>)}*/}
              {/*<Button*/}
              {/*  disabled={Boolean(existsInCart)}*/}
              {/*  style={[styles.action, styles.addToCartButton]}*/}
              {/*  onPress={handleAddToCart}*/}
              {/*>*/}
              {/*  <Icon color={Colors.white} name={!existsInCart ? 'cart-outline' : 'checkmark-outline'}*/}
              {/*        size={Spaces.large}/>*/}
              {/*</Button>*/}
            </View>}
            renderItem={({item}) => (<Text style={styles.ingredient}>
              {`- ${renderIngredient(item, measure)}`}
            </Text>)}
          />

        </View>
      </>}
      onScroll={handleScroll}
      data={steps}
      // @TODO replace on id when API is ready */
      keyExtractor={(item, index) => String(index)}
      renderItem={({item, index}) => {
        const {title, description, image} = item;

        return (<View style={styles.step} onLayout={event => {
          const layout = event.nativeEvent.layout;
          stepRefs[index] = layout.y;
        }}>
          <Text style={styles.stepTitle}>
            &nbsp;
            <Text style={styles.stepName}>
              {t('step', {number: index + 1})}
            </Text>
            {title ? `. ${title}` : ''}
          </Text>
          {description && <Text style={styles.stepDescription}>{description}</Text>}
          {image && <Image style={styles.stepImage} source={{uri: image}}/>}
        </View>);
      }}
    />

    {/* Voice assistant or video link */}
    {visibleCookingLink && (
      <Animated style={styles.button}>
        <Button
          type="wide"
          onPress={() => navigation.push(cookingRoute, {id})}
        >
          <Icon name="play-outline" size={24} color={Colors.white}/>
          {' '}
          {t('watchVideo')}
        </Button>
      </Animated>
    )}

    <MeasureModal
      isVisible={isMeasureModalOpen}
      currentMeasure={measure}
      onPress={measure => {
        setSetting('measure', measure);
        setIsMeasureModalOpen(false);
      }}
      onChangeVisible={setIsMeasureModalOpen}
    />
  </View>);
};

export const RecipePage = RecipePageComponent;
