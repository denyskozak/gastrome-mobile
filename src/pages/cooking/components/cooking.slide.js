import * as React from "react";
import Icon from '@expo/vector-icons/Ionicons';
import {View, Text, Pressable} from "react-native";
import Slider from '@react-native-community/slider';
import {useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';

import {Colors} from '../../../styles/colors';
import {Spaces} from '../../../styles/spaces';

import {Animated} from '../../../components/atomic/animated/animated.component';
import {VideoPlayer} from '../../../components/atomic/video-player/video-player.component';
import {Button} from '../../../components/atomic/button/button.component';
import {TimerButton} from '../../../components/templates/timer-button/timer-button';
import {Animation} from '../../../components/atomic/animation/animation.component';
import _ from 'lodash';
import {StoryProgressBar} from "../../../components/atomic/story-bar/story-bar";
import * as Haptics from "expo-haptics";
import {getDevice} from "../../../utilities/getCurrentDevice";
import {useTheme} from "../../../hooks/useTheme";
import {useStyles} from "./cooking.slide.styles";

export const CookingSlideComponent = ({
    // author,
    index,
    videoURL,
    backLabel = '',
    stepTitle,
    description,
    showHelpArrow,
    onBackClick,
    activeIndex,
    additionalText = '',
    hideButtons = false,
    loadingText = '',
    duration = '',
    onStartTimePress = () => {
    },
    isTimerActive = false,
    readCharIndex = 0,
    isListening,
    withVoiceAssistant = true,
    stepsCount,
    textSize,
    onTextSizeChange,
}) => {

    const [showArrow, setShowArrow] = useState(false);
    const [isTextHidden, setIsTextHidden] = useState(false);
    const [isPause, setPause] = useState(false);
    const { theme } = useTheme();
    const styles = useStyles(theme)
    useEffect(() => {
        if (showArrow) {
            setTimeout(() => setShowArrow(false), 10000);
        }
    }, [showArrow]);

    useEffect(() => {
        setPause(isTimerActive);
    }, [isTimerActive]);

    const pauseButton = (
        <View style={styles.backPause}>
            <Icon name={'pause'} color={Colors.black} size={Spaces.xxxlarge}/>
        </View>
    );

    const handlePressIn = useMemo(() => _.debounce(function () {
        setPause(true);
    }, 50), [setPause]);

    const handlePressOut = useMemo(() => _.debounce(function (value) {
        setPause(false);
    }, 50), [setPause]);

    return (
        <View
            style={styles.container}
        >
            <Pressable
                style={styles.content}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <VideoPlayer
                    shouldPlay={isPause ? false : activeIndex === index}
                    isMuted
                    isLooping
                    rate={0.7}
                    style={styles.video}
                    uri={videoURL}
                    loadingText={loadingText}
                    resizeMode="cover"
                    // progressLineBottomPosition={0}
                    progressLineBottomPosition={ getDevice() === 'iPad' ? Spaces.medium : 0}
                    onLoaded={() => {
                        if (showHelpArrow) setShowArrow(true)
                    }}
                />

                {!hideButtons && (
                    <>
                        <Animated duration={1000} name="SlideInLeft" outName="SlideOutLeft"
                                  style={styles.backButtonLeftContainer}>
                            <Button size="m" style={styles.backButton} type="outlined" onPress={() => {
                                Haptics.selectionAsync();
                                onBackClick?.();
                            }}>
                                <Text style={styles.backButtonText}>
                                    {backLabel}
                                </Text>
                            </Button>
                            {/*TODO return timer*/}
                            {/*{duration && !isTimerActive ?*/}
                            {/*    <TimerButton onPress={onStartTimePress} duration={duration}/> : null}*/}

                        </Animated>

                        {duration && !isTimerActive ?
                            <Animated duration={1000} name="SlideInLeft" outName="SlideOutLeft"
                                      style={styles.backButtonRightContainer}><TimerButton onPress={onStartTimePress}/>
                            </Animated> : null}
                    </>
                )}

                {isPause && !isTimerActive && pauseButton}

                <Animated
                    style={StyleSheet.flatten([styles.textContainer, readCharIndex !== 0 ? styles.textContainerActive : null])}>
                    <StoryProgressBar steps={stepsCount} activeIndex={index}/>
                    <Pressable style={styles.textBackIcon} onPress={() => {
                        Haptics.selectionAsync();
                        onBackClick?.();
                    }}>
                        <Icon name='chevron-back-outline' color={Colors.white} size={Spaces.large}/>
                    </Pressable>
                    <Pressable style={styles.textHideIcon} onPress={() => setIsTextHidden(!isTextHidden)}>
                        <Icon name={isTextHidden ? 'eye-outline' : 'eye-off-outline'} color={Colors.white}
                              size={Spaces.large}/>
                    </Pressable>
                    <Text style={[styles.step, {fontSize: textSize}]}>
                        {stepTitle}
                    </Text>
                    {!isTextHidden && description && (
                        <Text style={[styles.text, {fontSize: textSize}]}>
                            {readCharIndex === 0
                                ? description
                                : <>
                                    <Text
                                        style={[styles.readText, {fontSize: textSize}]}>{description.slice(0, readCharIndex)}</Text>
                                    {description.slice(readCharIndex, description.length)}
                                </>}
                        </Text>
                    )}
                    {!isTextHidden && additionalText && (
                        <Text style={[styles.text, {fontSize: textSize}]}>
                            {additionalText}
                        </Text>
                    )}
                    <View style={styles.textSizeControl}>
                        <Text style={styles.textSizeLabel}>A</Text>
                        <Slider
                            style={styles.textSizeSlider}
                            minimumValue={14}
                            maximumValue={24}
                            step={1}
                            value={textSize}
                            onValueChange={onTextSizeChange}
                            minimumTrackTintColor={Colors.white}
                            maximumTrackTintColor={Colors.gray}
                            thumbTintColor={Colors.white}
                        />
                        <Text style={styles.textSizeLabelLarge}>A</Text>
                    </View>
                </Animated>
                {/*{author && (*/}
                {/*    <View style={styles.authorContainer}>*/}
                {/*        <Text style={styles.author}>{author}</Text>*/}
                {/*    </View>*/}
                {/*)}*/}
                {showArrow && stepsCount > 1 && (
                    <Animated style={styles.helpArrow} delay={500}>
                        <Animation name="swipeLeft" height={Spaces.xxxlarge * 2.5} width={Spaces.xxxlarge * 2.5}/>
                    </Animated>
                )}
            </Pressable>
        </View>
    );
};

export const CookingSlide = CookingSlideComponent;
