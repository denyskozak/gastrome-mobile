import React, {useEffect} from 'react';
import {FlatList, Pressable, SafeAreaView, View} from 'react-native';
import {Text} from 'react-native';
import {useAuthor} from "../../hooks/useAuthor";
import {getDevice} from "../../utilities/getCurrentDevice";
import {RecipeItem} from "../recipes/components/recipes.item.component";
import {recipeRoute} from "../recipes/navigation/recipes.routes";
import {Animated} from "../../components/atomic/animated/animated.component";
import {AuthorPreview} from "../../components/molecular/author-preview/author-preview";
import {useTranslator} from '../../hooks/useTranslator';

import styles from './author.styles';
import {Spaces} from "../../styles/spaces";
import Icon from "@expo/vector-icons/Ionicons";
import * as Linking from "expo-linking";
import {contactURL} from "../../constants/links";
import * as Haptics from "expo-haptics";

let isFirstRun = true;

const AuthorPageComponent = (props) => {
    const {
        navigation, route: {params: {id}},
    } = props;

    useEffect(() => {
        isFirstRun = false;
    }, []);

    const [author, recipes] = useAuthor(id);

    const {name, description, image} = author;

    const [t] = useTranslator('pages.author');

    return (
        <SafeAreaView style={styles.container}>
            <AuthorPreview name={name} imageSource={image} />
            {author.instagram && <Pressable onPress={() =>  Linking.openURL(author.instagram)}><Icon name="logo-instagram" size={Spaces.xlarge} /></Pressable>}
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.recipes}>{t('recipes')}</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                data={recipes}
                gap={10}
                numColumns={getDevice() === 'iPad' ? 2 : 1}
                ListEmptyComponent={<Text style={styles.emptyList}>{t('emptyList')}</Text>}
                renderItem={({item, index}) => {
                    const element = (
                        <RecipeItem
                            key={item.id}
                            enableHint={isFirstRun && index < 3}
                            hideImage
                            onPress={id => {
                                Haptics.selectionAsync();
                                navigation.navigate(recipeRoute, {id});
                            }}
                            {...item}
                        />
                    );

                    return (
                        index > 1 ? element : (<Animated>{element}</Animated>));
                }}
            />
        </SafeAreaView>
    );
};

export const AuthorPage = AuthorPageComponent;

