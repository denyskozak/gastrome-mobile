import React from 'react';
import * as Speech from 'expo-speech';
import {ScrollView, Text, View} from 'react-native';
import {useTranslator} from '../../../hooks/useTranslator';
import {Button} from '../../../components/atomic/button/button.component';

import {Animated} from '../../../components/atomic/animated/animated.component';
import { useStyles } from './voiceSettings.styles';
import {useSettings} from "../../../contexts/settings.context.js";
import {useActivateSoundIOS} from "../../../hooks/useActiveSoundIOS";
import { useTheme } from '../../../hooks/useTheme';

const VoicePageComponent = (props) => {
    const {navigation} = props;

    useActivateSoundIOS();

    const [
        t, , language
    ] = useTranslator('pages.profile');
    const [settings, setSetting] = useSettings();
    const { theme } = useTheme();
    const styles = useStyles(theme);


    const handleSelectVoice = identifier => {
        Speech.stop()
            .then(() => {
                setSetting('speechProfile', identifier);
                Speech.speak(t('chooseNewVoice'), {
                    onDone: () => {},
                    language,
                    rate: 0.8,
                    voice: identifier
                })
            })
            .catch();
    };

    return (
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.text}>Choose Assistant voice:</Text>
                <View style={styles.content}>
                    {settings['speechProfiles'].map(({name, language, identifier}) => <Button type="outlined"
                                                                                              style={styles.assistantButton}
                                                                                              selected={settings['speechProfile'] === identifier}
                                                                                              key={`${name}-${language}`}
                                                                                              title={name}
                                                                                              onPress={() => handleSelectVoice(identifier)}/>)}
                </View>
            </ScrollView>
            <View style={styles.confirmButtonBackground}>
                {settings['speechProfile'] && (
                    <Animated name="BounceInDown">
                        <Button
                            style={styles.confirmButton}
                            textStyle={styles.confirmText}
                            type="contained"
                            onPress={() => {
                                (async () => {
                                    await Speech.stop();
                                    navigation.goBack();
                                })();
                            }}
                            title={t('confirmText')}
                        />
                    </Animated>
                )}
            </View>
        </View>
    );
};

export const VoicePage = VoicePageComponent;
