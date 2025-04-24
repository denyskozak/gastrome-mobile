import React, {useEffect, useMemo} from 'react';
import {FlatList, Image, Pressable, SafeAreaView, View} from 'react-native';
import {Text} from 'react-native';


import styles from './supplement.styles';
import Icon from "@expo/vector-icons/Ionicons";
import * as Linking from "expo-linking";
import * as Haptics from "expo-haptics";
import {supplements} from "../../../mock/supplements";
import {useTranslator} from "../../../hooks/useTranslator";

let isFirstRun = true;

const SupplementPageComponent = (props) => {
    const {
        navigation, route: {params: {id}},
    } = props;

    const item = useMemo(() => supplements.find(item => item.id === id), [id]);
    const [t] = useTranslator('pages.health');

    return (
        <SafeAreaView style={styles.container}>
            <Text  style={styles.text}>{item.name}</Text>

            <Image source={item.img} style={styles.image}/>
            <View style={styles.benefits}>
               <Text style={styles.description}> {t('benefits')}</Text>

                <FlatList
                    data={item.benefits}
                    renderItem={({item}) => <Text key={item} style={styles.benefit}>{item}</Text>}
                />
            </View>

        </SafeAreaView>
    );
};

export const SupplementPage = SupplementPageComponent;

