import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TouchableHighlight, View, Text, Pressable, Image } from 'react-native';
import PropTypes from 'prop-types';

import { Button } from '../../../components/atomic/button/button.component';
import { useTranslator } from '../../../hooks/useTranslator';
import { cutText } from '../../../utilities/cutText';

import styles from './recipes-generator.styles';
import { AttentionAnimation } from '../../../components/molecular/attansion-animation/attansion-animation.component';
import { delayForPromise } from '../../../utilities/promiseDelay';
import { Animated } from '../../../components/atomic/animated/animated.component';
import Icon from '@expo/vector-icons/Ionicons';
import { Colors } from '../../../styles/colors';
import { Spaces } from '../../../styles/spaces';
import {useRecipes} from "../../../hooks/useRecipes";

const RecipesGeneratorComponent = (props) => {
  const {onRecipePress} = props;
  const [t] = useTranslator('components.recipesGenerator');

  const [randomRecipe, setRandomRecipe] = useState(null);

  const [recipes] = useRecipes();
  const getTreeRandomRecipe = useCallback(() => recipes[Math.floor(Math.random() * recipes.length)], [recipes]);

  useEffect(() => {
    setRandomRecipe(getTreeRandomRecipe())
  }, [setRandomRecipe, recipes]);

  const ingredientsList = useMemo(() =>
      (randomRecipe ? randomRecipe.ingredients : [])
        .slice(0, 5)
        .map(item => item.title)
        .join(', '),
    [randomRecipe]
  );
  const renderThreeDots = items => items.length > 4 ? '...' : '';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>{t('title')}</Text>

        {/*Random list*/}
        {randomRecipe && (
          <Animated>
            {randomRecipe && (
              <Pressable style={styles.recipe} onPress={() => onRecipePress(randomRecipe.id)}>
                {randomRecipe.image && (
                  <TouchableHighlight activeOpacity={0.8} onPress={() => onRecipePress(randomRecipe.id)}>
                    <View>
                      <Image
                        rounded
                        source={randomRecipe.image}
                        style={styles.image}
                      />
                        <View style={styles.imageIcon}>
                          <Icon name={'play-circle-outline'}
                                color={Colors[randomRecipe ? randomRecipe.iconColor : 'black']}
                                size={Spaces.xxlarge + Spaces.small}/>
                        </View>
                    </View>
                  </TouchableHighlight>
                )}
                <View style={styles.timeContainer}>
                  <Text>
                    <Icon name="time-outline" size={14}/>
                    {'  '}
                    {t('time', {time: String(randomRecipe.time)})}
                    {' - '}
                    {randomRecipe.level}
                  </Text>
                </View>
                <Text style={styles.title}>
                  {cutText(50, randomRecipe.title)}
                </Text>
                <Text style={styles.ingredients}>
                  {ingredientsList}{renderThreeDots(ingredientsList)}
                </Text>
              </Pressable>

            )}
          </Animated>
        )}


        {/*Generate new list*/}
        <AttentionAnimation end={1.03}>
          <Button
            title={t('generate')}
            size="xl"
            textStyle={styles.getNewText}
            style={styles.getNewButton}
            onPress={() => {
              delayForPromise(300)
                .then(() => {
                  setRandomRecipe(getTreeRandomRecipe());
                })
            }}
          />
        </AttentionAnimation>
      </View>
    </View>
  );
}

RecipesGeneratorComponent.propTypes = {
  onRecipePress: PropTypes.func.isRequired,
};

export const RecipesGenerator = RecipesGeneratorComponent;