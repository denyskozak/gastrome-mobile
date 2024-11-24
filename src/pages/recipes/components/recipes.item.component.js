import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import Icon from '@expo/vector-icons/Ionicons';
import {Pressable, Text, View, TouchableHighlight, Image} from 'react-native';

import {Button} from '../../../components/atomic/button/button.component';
import {useTranslator} from '../../../hooks/useTranslator';
import {CountryList} from '../../../components/atomic/country-flag/country-flag.list';
import {CountryFlag} from '../../../components/atomic/country-flag/country-flag.component';
import {Animation} from '../../../components/atomic/animation/animation.component';
import {Colors} from '../../../styles/colors';
import {Spaces} from '../../../styles/spaces';
import {cutText} from '../../../utilities/cutText';
import {Animated} from '../../../components/atomic/animated/animated.component';

import styles from './recipes.item.styles';
import {ZoomInOut} from "../../../components/molecular/zoom-in-out-animation/zoom-in-out-animation";

const RecipeItemComponent = (props) => {
    const {
        id,
        time,
        image,
        title,
        level,
        subTitle,
        onPress,
        ingredients,
        selectedIngredients,
        filters,
        isFavorited,
        animate,
        enableHint = false,
    } = props;
    const [t] = useTranslator('pages.recipes');

    const recipeCountry = useMemo(() => {
        return filters.find(item => CountryList.includes(item));
    }, [filters]);

    const selectedIngredientsList = useMemo(() => {
        if (selectedIngredients.length === 0) return [];
        return ingredients
            .filter(
                item => Boolean(selectedIngredients.find(ingredient => ingredient === item.title))
            )
            .map(item => item.title)
    }, [selectedIngredients, ingredients]);

    const ingredientsList = useMemo(() =>
            ingredients
                .slice(0, 5 - selectedIngredientsList.length)
                .map(item => item.title)
                .join(', '),
        [ingredients, selectedIngredientsList]
    );

    const renderThreeDots = items => items.length > 4 ? '...' : '';

    return (<Pressable style={styles.container} onPress={() => onPress(id)}>
        {image && (
            <TouchableHighlight style={styles.imageTouchable} activeOpacity={0.9} onPress={() => onPress(id)}>
                <View>
                    <ZoomInOut enabled={animate} width={styles.image.width} height={styles.image.height}>
                        <Image
                            source={image}
                            style={styles.image}
                        />
                    </ZoomInOut>

                    {/*<AttentionAnimation duration={1200} start={0.5} end={1} property="opacity">*/}
                    {enableHint && <Animated duration={800} delay={1000} outName="FadeOut" style={styles.imageIcon}>
                        <Animation name="click" autoPlay={false} height={Spaces.xxxlarge * 1.2}
                                   width={Spaces.xxxlarge * 1.2}/>
                        {/*<Icon name={'play-circle-outline'} color={Colors[iconColor]}*/}
                        {/*      size={Spaces.xxlarge + Spaces.small}/>*/}
                    </Animated>}
                    {/*</AttentionAnimation>*/}
                </View>
            </TouchableHighlight>
        )}

        <View style={styles.content}>
            {/*Has video steps @TODO remove if not need */}
            {/*{hasVideoSteps && (*/}
            {/*  <Text style={styles.hasVideoSteps}>*/}
            {/*    <Icon name="film-outline" size={16}/>*/}
            {/*    {' '}*/}
            {/*    {t('hasVideoSteps')}*/}
            {/*  </Text>*/}
            {/*)}*/}
            <View style={styles.icons}>
                {isFavorited && (<Icon name="bookmark" color={Colors.red} size={Spaces.large}/>)}
                {recipeCountry && <View style={styles.flag}><CountryFlag name={recipeCountry}/></View>}
            </View>
            <View style={styles.timeContainer}>
                <Text>
                    <Icon name="time-outline" size={14}/>
                    {'  '}
                    {t('time', {time})}
                    {' - '}
                    {level}
                </Text>
            </View>
            <Text style={styles.title}>
                {cutText(50, title)}
            </Text>
            {subTitle && <Text style={styles.subTitle}>{cutText(150, subTitle)}</Text>}
            <Text style={styles.ingredients}>
                {/*Render selected ingredients by user*/}
                {selectedIngredientsList.length > 0
                    ? (<Text
                        style={styles.selectedIngredients}>{t('selectedIngredients')} {selectedIngredientsList.join(', ')}{renderThreeDots(selectedIngredientsList)}</Text>)
                    : <>{ingredientsList}{renderThreeDots(ingredientsList)}</>
                }
            </Text>
            <Button
                style={styles.selectButton}
                textStyle={styles.selectButtonText}
                type="outlined"
                title={t('get')}
                onPress={() => onPress(id)}
            />
        </View>
    </Pressable>);
};

RecipeItemComponent.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.string),
    selectedIngredients: PropTypes.arrayOf(PropTypes.string),
    isFavorited: PropTypes.bool,
    enableHint: PropTypes.bool,
    animate: PropTypes.bool
};

RecipeItemComponent.defaultProps = {
    filters: [],
    selectedIngredients: [],
    isFavorited: false,
    enableHint: false,
    animate: false,
};

export const RecipeItem = React.memo(RecipeItemComponent);