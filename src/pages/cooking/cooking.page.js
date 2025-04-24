import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {Audio} from 'expo-av';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';
import {isAvailableAsync, requestReview} from 'expo-store-review';
import {useFocusEffect} from '@react-navigation/native';
import {Carousel} from '../../components/molecular/carousel/carousel.component';
import {useTranslator} from '../../hooks/useTranslator';
import {VoiceButton} from '../recipe/components/voice.button/voice.button.component';
import {CookingSlide} from './components/cooking.slide';
import {Modal} from '../../components/atomic/modal/modal.component';
import {Animation} from '../../components/atomic/animation/animation.component';
import {Button} from '../../components/atomic/button/button.component';
import {PermissionModal} from '../../components/templates/permission-modal/permission-modal.component';
import {VolumeModal} from '../../components/templates/volume-modal/volume-modal.component';
import {getVoiceOneWord} from '../../utilities/getVoiceOneWord';
import {useSpeechProfile} from '../../hooks/useSpeechProfile.js';
import {useAWS} from '../../hooks/useAWS';
import {delayForPromise} from '../../utilities/promiseDelay';
import {useActivateSoundIOS} from '../../hooks/useActiveSoundIOS';
import {VolumeManager} from 'react-native-volume-manager';
import {CircleTimer} from '../../components/molecular/circle-timer/circle-timer';
import {secondsToMinutesWithTranslations} from '../../utilities/timeParsers';
import {Spaces} from '../../styles/spaces';

import styles from './cooking.page.styles';
import {useRecipes} from "../../hooks/useRecipes";
import {useSettings} from "../../contexts/settings.context";
import {useLogger} from "../../hooks/useLogger";
import {StoryProgressBar} from "../../components/atomic/story-bar/story-bar";
import * as Haptics from "expo-haptics";
import {logEvent} from "../../utilities/google-analitics";

const alarmSong = require('./alarm.mp3');
const soundObject = new Audio.Sound();

let isFirstAssistantRun = true;

export const CookingPage = (props) => {
    const {
        navigation,
        route: {params: {id}},
    } = props;

    const [speechProfile] = useSpeechProfile();
    useActivateSoundIOS();

    const carouselRef = React.useRef();
    const {getCookingStepURL} = useAWS();

    const [t, , language] = useTranslator('pages.cooking');
    const [tCommon] = useTranslator('common');
    const [recipes] = useRecipes();
    const [settings, setSetting] = useSettings();
    const [logError] = useLogger();
    const [targetStep, setTargetStep] = useState(null);
    const [helpModalVisible, setHelpModalVisible] = useState(false);
    const [permissionModalVisible, setPermissionModalVisible] = useState(false);
    const [isListening, setListening] = useState(false);
    const [isVolumeModalVisible, setVolumeModalVisible] = useState(false);
    const [isTimerActive, setIsTimeActive] = useState(false);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [timerVoiceActivated, setTimerVoiceActivated] = React.useState(false); // regarding from where timer was called
    const [readCharIndex, setReadCharIndex] = useState(0);
    const [voiceTooltipText, setVoiceTooltipText] = useState('');
    const voiceAnimationRef = useRef(null);
    const [lastCommandDevMode, setLastCommandDevMove] = useState('');

    const parseDuration = useCallback((value) => {
        const translates = {
            hour: tCommon('hour'),
            hours: tCommon('hours'),
            minute: tCommon('minute'),
            minutes: tCommon('minutes'),
            second: tCommon('second'),
            seconds: tCommon('seconds'),
        }
        return secondsToMinutesWithTranslations(value, translates);
    }, [t]);

    const recipe = useMemo(() => recipes.find(item => item.id === id), [id, recipes]);
    const steps = useMemo(() =>
            recipe.steps
                .map((item, index) => ({
                    ...item,
                    videoURL: recipe.isSingleVideo ? getCookingStepURL(recipe.id, 1) : getCookingStepURL(recipe.id, index + 1)
                }))
                .map((item, index) =>
                    ({
                        ...item,
                        stepTitle: t('step', {index: index + 1, count: recipe.steps.length}),
                        description: item.description
                    })
                ),
        [recipe.steps]);

    useEffect(() => {
        logEvent('cooking_page', { id, title: recipe.title})
    }, [recipe]);

    const say = (text, onDone = () => {
    }) => {
        voiceAnimationRef?.current?.pause?.();
        voiceAnimationRef?.current?.play?.();
        Speech.speak(text, {
            language, rate: 0.8, voice: speechProfile,
            onDone: () => {
                voiceAnimationRef?.current?.pause?.();
                onDone();
                setReadCharIndex(0);
            },
            onBoundary: ({charIndex}) => {
                setReadCharIndex(Number(charIndex))
            }
        })
    };

    const startListen = () => {
        (async () => {
            Haptics.impactAsync('medium');
            setVoiceTooltipText(t('voiceCommands'));
            await Voice.start(language);
        })();
    };

    const readText = async (step, isLast = false) => {
        if (await Speech.isSpeakingAsync()) return;
        const lastStepText = isLast ? `   ${t('lastStep')}` : '';
        const hasDurationStep = steps[step] && steps[step].duration && steps[step].duration > 0
            ? `  ${t('durationCommand', {duration: parseDuration(steps[step].duration)})}`
            : '';
        setVoiceTooltipText(t('listenText'));

        say(
            `${steps[step].description}${hasDurationStep}${lastStepText}, ${t('nextCommand')}`,
            startListen,
        );
    };

    const changeStepTo = (index) => {
        if (carouselRef.current && carouselRef.current.scrollTo instanceof Function) {
            carouselRef.current.scrollTo({index, animated: true})
        }
    };

    const readAndRunToStep = async (step, isLast = false) => {
        await Voice.stop();
        await Voice.destroy();
        changeStepTo(step);
        await delayForPromise(500);
        setTargetStep(step);
        await readText(step, isLast);
    }

    const startVoiceUsage = async () => {
        if (isListening) {
            setListening(!isListening);
            await Voice.stop();
            await Speech.stop();
            setTargetStep(null);
        } else {
            setListening(!isListening);
            await readAndRunToStep(0);
        }
    }

    const activeStepDuration = steps[activeIndex].duration || 0;

    const handleTimerSongStop = useCallback(async () => {
        const status = await soundObject.getStatusAsync();
        if (status.isPlaying) {
            await soundObject.stopAsync();
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            let isVoiceAnimationInProcess = false;

            Voice.onSpeechPartialResults = async ({value}) => {
                try {
                    if (!isVoiceAnimationInProcess) {
                        isVoiceAnimationInProcess = true;
                        voiceAnimationRef?.current?.play();
                        await delayForPromise(500);
                        voiceAnimationRef?.current?.pause?.();
                        isVoiceAnimationInProcess = false;
                    }

                    const command = getVoiceOneWord(value[0]);
                    if (settings['isDevMode']) {
                        setLastCommandDevMove(command);
                    }
                    const targetStepDuration = (targetStep === null ? steps[0].duration : steps[targetStep].duration) || 0;

                    if (command === t('next')) {
                        if (targetStep === steps.length - 1) return;
                        const step = Number.isInteger(targetStep) ? targetStep + 1 : 0;
                        await readAndRunToStep(step, targetStep === steps.length - 2);
                    }

                    if (command === t('backCommand')) {
                        if (targetStep === 0) return;
                        const step = Number.isInteger(targetStep) ? targetStep - 1 : 0;
                        await readAndRunToStep(step);
                    }

                    if (command === t('timer')) {
                        if (targetStepDuration > 0) {
                            await Voice.stop();
                            await Voice.destroy();
                            setListening(false);
                            setIsTimeActive(true);
                            setTimerVoiceActivated(true);
                        }
                    }

                    if (command === t('repeat')) {
                        await Voice.stop();
                        await Voice.destroy();
                        await readText(targetStep);
                    }

                    if (command === t('done')) {
                        await Voice.stop();
                        await Voice.destroy();
                        setListening(!isListening);
                        isAvailableAsync().then(() => requestReview());
                    }
                } catch (e) {
                    logError(e.message)
                }
            };
        }, [targetStep, t, settings['isDevMode']])
    );

    useEffect(() => {
        navigation.addListener('blur', async () => {
            await Voice.destroy();
            await Speech.stop();
            await handleTimerSongStop();
            setIsTimeActive(false);
            setTimerVoiceActivated(false);
            setListening(false);
        });
    }, []);

    useEffect(() => {
        setIsTimeActive(false);
        setTimerVoiceActivated(false);
        handleTimerSongStop().then().catch();
    }, [activeIndex]);

    const handleStartCookingPress = async () => {
        setIsTimeActive(false);
        await handleTimerSongStop();
        const {status} = await Audio.requestPermissionsAsync();
        const isVoiceRecognizationAvailable = await Voice.isAvailable();
        const {volume} = await VolumeManager.getVolume();

        if (status !== 'granted' || isVoiceRecognizationAvailable === 0) {
            setPermissionModalVisible(true);
            return;
        }

        if (volume < 0.2) {
            setVolumeModalVisible(true);
            return;
        }

        if (isFirstAssistantRun) {
            setHelpModalVisible(true);
            isFirstAssistantRun = false;
        } else {
            await delayForPromise(1000);
            await startVoiceUsage();
        }
    };

    const handleTimerDone = async () => {
        const status = await soundObject.getStatusAsync();
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
        });

        if (!status.isLoaded) {
            await soundObject.loadAsync(alarmSong);
            await soundObject.playAsync();
        } else {
            await soundObject.replayAsync();
        }
    };

    const withVoiceAssistant = steps.length > 1;

    const renderItem = ({index, item, activeIndex}) => (
        <CookingSlide
            key={item.stepTitle}
            index={index}
            stepsCount={steps.length}
            showHelpArrow={index === 0}
            videoURL={item.videoURL}
            activeIndex={activeIndex}

            stepTitle={item.stepTitle}
            readCharIndex={index === targetStep ? readCharIndex : 0}
            description={!settings['isDevMode'] ? item.description : `${item.description}\n Last Command - ${lastCommandDevMode}`}
            duration={item.duration ? parseDuration(item.duration) : ''}
            isTimerActive={isTimerActive}
            onStartTimePress={() => setIsTimeActive(true)}
            hideButtons={isListening || timerVoiceActivated}
            isListening={isListening && !timerVoiceActivated}
            onBackClick={() => navigation.goBack()}
            withVoiceAssistant={withVoiceAssistant}

            additionalText={recipe.isSingleVideo ? t('singleVideo') : ''}
            backLabel={t('back')}
            loadingText={t('loading')}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            {/*Voice assistant*/}
            {!timerVoiceActivated && withVoiceAssistant && (
                <VoiceButton
                    voiceTooltipText={voiceTooltipText}
                    animationRef={voiceAnimationRef}
                    isListening={isListening && !timerVoiceActivated}
                    startText={t('startVoice')}
                    onButtonPress={handleStartCookingPress}
                />
            )}
            <Carousel
                ref={carouselRef}
                items={steps}
                renderItem={renderItem}
                activeIndex={activeIndex}
                onChangeActiveIndex={setActiveIndex}
            />

            {/*Timer*/}
            {
                isTimerActive && activeStepDuration
                    ? <Pressable style={styles.timer} onPress={async () => {
                        setIsTimeActive(false);

                        if (timerVoiceActivated) {
                            setTimerVoiceActivated(false);
                            await delayForPromise(2000);
                            setListening(!isListening);
                            say(t('nextCommand'), () => {
                                startListen();
                            });
                        }
                    }}>
                        <CircleTimer
                            duration={activeStepDuration}
                            onComplete={async () => {
                                await handleTimerDone();

                                // if has been called from voice
                                if (timerVoiceActivated) {
                                    await delayForPromise(4000);
                                    setIsTimeActive(false);
                                    setTimerVoiceActivated(false);
                                    await delayForPromise(2000);
                                    setListening(!isListening);
                                    say(t('nextCommand'), () => {
                                        startListen();
                                    });
                                }

                                setIsTimeActive(false)
                            }}
                        />
                    </Pressable>
                    : null
            }
            {/*Voice assistant helper*/}
            <Modal isVisible={helpModalVisible} onChangeVisible={setHelpModalVisible}>
                <Animation name="prepareCooking" width={Spaces.xxxlarge * 5} height={Spaces.xxxlarge * 5}/>
                <Text style={styles.helpModalTitle}>{t('assistantCommandsTitle')}</Text>
                <Button
                    style={styles.helpModalButton}
                    textStyle={styles.helpModalButtonText}
                    type="fulled"
                    // textStyle={styles.helpModalStartButtonText}
                    onPress={() => {
                        setHelpModalVisible(false);

                        setTimeout(() => {
                            startVoiceUsage().then().catch();
                        }, 1000);
                    }}
                    title={t('start')}
                />
                {/*TODO Return if need*/}
                {/*<Button*/}
                {/*  type="outlined"*/}
                {/*  style={styles.helpModalButton}*/}
                {/*  onPress={() => {*/}
                {/*    setHelpModalVisible(false);*/}
                {/*    navigation.push(voiceSettingsRecipeRoute)*/}
                {/*  }}*/}
                {/*  title={t('voiceSelect')}*/}
                {/*/>*/}
            </Modal>
            <PermissionModal
                isVisible={permissionModalVisible}
                onChangeVisible={setPermissionModalVisible}
                onPress={
                    async () => {
                        const {status} = await Audio.requestPermissionsAsync();
                        const isVoiceRecognizationAvailable = await Voice.isAvailable();

                        if (status === 'granted' && isVoiceRecognizationAvailable === 1) {
                            await startVoiceUsage();
                        }

                        setPermissionModalVisible(false);
                    }
                }
            />
            <VolumeModal
                isVisible={isVolumeModalVisible}
                onChangeVisible={setVolumeModalVisible}
                onTryAgainPress={async () => {
                    const {volume} = await VolumeManager.getVolume();

                    setVolumeModalVisible(false);
                    await delayForPromise(1500);

                    if (volume > 0) {
                        handleStartCookingPress().then().catch();
                    }
                }}
            />
        </SafeAreaView>
    )
};
