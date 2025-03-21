import React, {useEffect} from 'react';
import {Image, Pressable, SafeAreaView, View} from 'react-native';
import {useTranslator} from '../../hooks/useTranslator';
import * as Linking from "expo-linking";
import Icon from "@expo/vector-icons/Ionicons";
import {Text} from 'react-native';
import { FlashList } from "@shopify/flash-list";

import {getDevice} from "../../utilities/getCurrentDevice";
import {Button} from "../../components/atomic/button/button.component";
import {Colors} from "../../styles/colors";

import {AuthorPreview} from "../../components/molecular/author-preview/author-preview";
import {useAuthors} from "../../hooks/useAuthors";
import {contactURL} from "../../constants/links";
import {authorRoute} from "../recipes/navigation/recipes.routes";
import {supplements} from "../../mock/supplements";

import styles from './health.styles';
import {AttentionAnimation} from "../../components/molecular/attansion-animation/attansion-animation.component";
import * as Haptics from "expo-haptics";
import {supplementRoute} from "./navigation/health.routes";

let isFirstRun = true;

const HealthPageComponent = (props) => {
    const {
        navigation,
    } = props;

    useEffect(() => {
        isFirstRun = false;
    }, []);

    const [authors] = useAuthors();

    const [t] = useTranslator('pages.health');

    return (
        <SafeAreaView style={styles.container}>
            <FlashList
                showsVerticalScrollIndicator={false}
                // contentContainerStyle={styles.list}
                data={supplements}
                // gap={10}
                numColumns={2}
                estimatedItemSize={supplements.length}
                renderItem={({item, index}) => (
                    <Pressable  style={styles.item} key={item.name} onPress={() => {
                        Haptics.selectionAsync();
                        navigation.navigate(supplementRoute, {id: item.id});
                    }}>
                        <Image source={item.img} style={styles.image}/>
                        <Text  style={styles.text}>{item.name}</Text>
                    </Pressable>
                )}
            />
        </SafeAreaView>
    );
};

export const HealthPage = HealthPageComponent;
