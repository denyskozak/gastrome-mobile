import React, {useEffect} from 'react';
import {FlatList, Pressable, SafeAreaView, View} from 'react-native';
import {useTranslator} from '../../hooks/useTranslator';
import * as Linking from "expo-linking";
import Icon from "@expo/vector-icons/Ionicons";
import {Text} from 'react-native';

import {getDevice} from "../../utilities/getCurrentDevice";
import {Button} from "../../components/atomic/button/button.component";
import {Colors} from "../../styles/colors";

import {AuthorPreview} from "../../components/molecular/author-preview/author-preview";
import {useAuthors} from "../../hooks/useAuthors";
import {contactURL} from "../../constants/links";
import {authorRoute} from "../recipes/navigation/recipes.routes";

import styles from './authors.styles';

let isFirstRun = true;

const AuthorsPageComponent = (props) => {
    const {
        navigation,
    } = props;

    useEffect(() => {
        isFirstRun = false;
    }, []);

    const [authors] = useAuthors();

    const [t] = useTranslator('pages.authors');

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                data={authors}
                gap={10}
                numColumns={getDevice() === 'iPad' ? 2 : 1}
                ListEmptyComponent={<Text style={styles.emptyList}>{t('emptyList')}</Text>}
                ListFooterComponent={(
                    <Button onPress={() => {
                        Linking.openURL(contactURL)
                    }}>
                        <Text style={styles.subscriptionsButton}>
                            <Icon name="heart" size={24} color={Colors.red}/>
                            {' '}
                            {t('becomeChef')}
                            {' '}
                            <Icon name="heart" size={24} color={Colors.red}/>
                        </Text>
                    </Button>
                )}
                renderItem={({item, index}) => (
                    <Pressable onPress={() => navigation.navigate(authorRoute, { id: item.id })}>
                        <AuthorPreview name={item.name} imageSource={item.image} />
                    </Pressable>
                )}
            />
        </SafeAreaView>
    );
};

export const AuthorsPage = AuthorsPageComponent;
