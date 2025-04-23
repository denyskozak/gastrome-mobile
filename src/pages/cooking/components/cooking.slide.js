import * as React from "react";
import Icon from '@expo/vector-icons/Ionicons';
import PropTypes from 'prop-types';
import {View, Text, Pressable} from "react-native";
import {useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';

import {Colors} from '../../../styles/colors';
import {Spaces} from '../../../styles/spaces';
import styles from './cooking.slide.styles';

import {Animated} from '../../../components/atomic/animated/animated.component';
import {VideoPlayer} from '../../../components/atomic/video-player/video-player.component';
import {Button} from '../../../components/atomic/button/button.component';
import {TimerButton} from '../../../components/templates/timer-button/timer-button';
import {Animation} from '../../../components/atomic/animation/animation.component';
import _ from 'lodash';
import {StoryProgressBar} from "../../../components/atomic/story-bar/story-bar";
import * as Haptics from "expo-haptics";
import {getDevice} from "../../../utilities/getCurrentDevice";

export const CookingSlideComponent = (props) => {
    const {
        author,
        index,
        videoURL,
        backLabel,
        stepTitle,
        description,
        showHelpArrow,
        onBackClick,
        activeIndex,
        additionalText,
        hideButtons,
        loadingText,
        duration,
        onStartTimePress,
        isTimerActive,
        readCharIndex,
        isListening,
        withVoiceAssistant,
        stepsCount,
    } = props;

    const [showArrow, setShowArrow] = useState(false);
    const [isTextHidden, setIsTextHidden] = useState(false);
    const [isPause, setPause] = useState(false);

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
                    <Text style={styles.step}>
                        {stepTitle}
                    </Text>
                    {!isTextHidden && description && (
                        <Text style={styles.text}>
                            {readCharIndex === 0
                                ? description
                                : <>
                                    <Text
                                        style={styles.readText}>{description.slice(0, readCharIndex)}</Text>
                                    {description.slice(readCharIndex, description.length)}
                                </>}
                        </Text>
                    )}
                    {!isTextHidden && additionalText && (
                        <Text style={styles.text}>
                            {additionalText}
                        </Text>
                    )}
                </Animated>
                {author && (
                    <View style={styles.authorContainer}>
                        <Text style={styles.author}>{author}</Text>
                    </View>
                )}
                {showArrow && stepsCount > 1 && (
                    <Animated style={styles.helpArrow} delay={500}>
                        <Animation name="swipeLeft" height={Spaces.xxxlarge * 2.5} width={Spaces.xxxlarge * 2.5}/>
                    </Animated>
                )}
            </Pressable>
        </View>
    );
};

CookingSlideComponent.propTypes = {
    onBackClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    showHelpArrow: PropTypes.bool,
    isListening: PropTypes.bool.isRequired,
    videoURL: PropTypes.string.isRequired,
    stepTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    activeIndex: PropTypes.number.isRequired,
    author: PropTypes.string,
    backLabel: PropTypes.string,
    hideButtons: PropTypes.bool,
    isPause: PropTypes.bool,
    additionalText: PropTypes.string,
    loadingText: PropTypes.string,
    duration: PropTypes.string,
    onStartTimePress: PropTypes.func,
    isTimerActive: PropTypes.bool,
    readCharIndex: PropTypes.number,
    withVoiceAssistant: PropTypes.bool,
    stepsCount: PropTypes.number.isRequired,
}
CookingSlideComponent.defaultProps = {
    hideButtons: false,
    isBackDisabled: false,
    isPause: false,
    additionalText: '',
    author: null,
    backLabel: '',
    loadingText: '',
    duration: '',
    isTimerActive: false,
    onStartTimePress: () => {
    },
    readCharIndex: 0,
    withVoiceAssistant: true,
}

export const CookingSlide = CookingSlideComponent;