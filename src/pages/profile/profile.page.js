import React, {useState} from 'react';
import * as Linking from 'expo-linking';

import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useTranslator} from '../../hooks/useTranslator';
import {Button} from '../../components/atomic/button/button.component';

import {Spaces} from '../../styles/spaces';
import {devModeRoute, subscriptionsSettingsRoute, voiceSettingsRoute} from './navigation/profile.routes';

import styles from './profile.styles';
import {MeasureModal} from '../../components/templates/measure-modal/measure-modal.component';
import {useSettings} from '../../contexts/settings.context';
import {isAvailableAsync, requestReview} from 'expo-store-review';
import {contactURL, privacyURL, termsURL} from "../../constants/links";
import {SubscriptionButton} from "../../components/templates/subscription-button/subscription-button";
import {useSubscriptions} from "../../contexts/subscriptions.context";
import {AnimatedLogo} from "../../components/atomic/logo/animated-logo.component";

const languagesList = [
    ['UA', 'uk'],
    ['RU', 'ru'],
    ['EN', 'en'],
];

const SettingsPageComponent = (props) => {
    const {navigation} = props;
    const [
        t,
        setLanguage,
        currentLanguage
    ] = useTranslator('pages.profile');
    const [settings, setSetting] = useSettings();

    const {measure} = settings;
    const [isMeasureModalOpen, setIsMeasureModalOpen] = useState(false);
    const [clicksForDevMode, setClicksForDevMode] = useState(0);
    const [isSubscriber] = useSubscriptions();

    const handleClickForDevMode = () => {
        if (clicksForDevMode === 4) setSetting('isDevMode', !settings['isDevMode']);
        setClicksForDevMode(clicksForDevMode === 4 ? 0 : clicksForDevMode + 1);
    }

    const renderLanguageButton = ([title, language]) => (
        <Button key={language} title={title} type="outlined" selected={language === currentLanguage}
                onPress={() => {
                    setLanguage(language);
                }}/>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <SafeAreaView style={styles.content}>

                {/*<Icon name="person-circle-outline" size={Spaces.xxxlarge} color={Colors.primary}/>*/}
                {/*<Animation name="cooking" width={Spaces.xxxlarge * 3} height={Spaces.xxxlarge * 3}/>*/}
                <AnimatedLogo delay={300} isInfinity/>


                {/*Lang switcher*/}
                {/*<View style={styles.languages}>*/}
                {/*    {languagesList.map(renderLanguageButton)}*/}
                {/*</View>*/}

                <View style={styles.settingButtons}>
                    <SubscriptionButton text={isSubscriber ? t('community') : t('join')}
                                        onPress={() => navigation.navigate(subscriptionsSettingsRoute)}/>
                    <Button
                        type="outlined"
                        style={styles.settingButton}
                        title={t('chooseAssistantButton')}
                        onPress={() => navigation.navigate(voiceSettingsRoute)}
                    />
                    {/*<Button*/}
                    {/*  type="outlined"*/}
                    {/*  style={styles.settingButton}*/}
                    {/*  title={t('measure')}*/}
                    {/*  onPress={() => setIsMeasureModalOpen(true)}*/}
                    {/*/>*/}
                    {/*<Button*/}
                    {/*  type="outlined"*/}
                    {/*  style={styles.settingButton}*/}
                    {/*  title={t('storage')}*/}
                    {/*  onPress={() => navigation.navigate(storageRoute)}*/}
                    {/*/>*/}
                    <Button
                        type="outlined"
                        style={styles.settingButton}
                        title={t('feedback')}
                        onPress={() => isAvailableAsync().then(() => requestReview())}
                    />
                    <Button
                        type="outlined"
                        style={styles.settingButton}
                        title={t('contact')}
                        onPress={() => Linking.openURL(contactURL)}
                    />
                    {!settings['isDevMode'] && (
                        <>
                            <Button
                                type="outlined"
                                style={styles.settingButton}
                                title={t('terms')}
                                onPress={() => Linking.openURL(termsURL)}
                            />
                            <Button
                                type="outlined"
                                style={styles.settingButton}
                                title={t('privacy')}
                                onPress={() => Linking.openURL(privacyURL)}
                            />
                        </>
                    )}

                    {/*<Button*/}
                    {/*  type="outlined"*/}
                    {/*  style={styles.settingButton}*/}
                    {/*  title={t('faq')}*/}
                    {/*  onPress={() => navigation.navigate(faqRoute)}*/}
                    {/*/>*/}
                    {settings['isDevMode'] && <Button
                        type="outlined"
                        style={styles.settingButton}
                        title="Dev Page"
                        onPress={() => navigation.navigate(devModeRoute)}
                    />}
                </View>
                <Pressable style={styles.footer} onPress={handleClickForDevMode}>
                    <Text
                        style={styles.footerText}>{settings['isDevMode'] ? 'WELCOME IN DEV MOVE <3' : t('footer')}</Text>
                </Pressable>

                <MeasureModal
                    isVisible={isMeasureModalOpen}
                    currentMeasure={measure}
                    onPress={measure => {
                        setSetting('measure', measure);
                        setIsMeasureModalOpen(false);
                    }}
                    onChangeVisible={setIsMeasureModalOpen}
                />

            </SafeAreaView>


        </ScrollView>
    );
};

export const ProfilePage = SettingsPageComponent;