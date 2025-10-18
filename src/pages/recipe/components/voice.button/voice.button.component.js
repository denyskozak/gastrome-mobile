import React, {useEffect, useState} from 'react';
import { Pressable, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from '@expo/vector-icons/Ionicons';

import styles from './voice.button.styles';
import { Animation } from '../../../../components/atomic/animation/animation.component';
import { Animated } from '../../../../components/atomic/animated/animated.component';
import { useTranslator } from '../../../../hooks/useTranslator';
import { Tooltip } from '../../../../components/atomic/tooltip/tooltip.component';
import { Button } from '../../../../components/atomic/button/button.component';
import { Colors } from '../../../../styles/colors';
import {AttentionAnimation} from "../../../../components/molecular/attansion-animation/attansion-animation.component";
import microJSON from "../../../../components/atomic/animation/list/micro-voice.json";
import {Spaces} from "../../../../styles/spaces";
import {FirstLaunchTooltip} from "../../../../components/molecular/first-launch-tooltip/first-launch-tooltip.component";
import {VOICE_ASSISTANT_TIP} from "../../../../constants/asyncStoreKeys";
import * as Haptics from "expo-haptics";

const VoiceButtonComponent = (props) => {
  const {isListening, onButtonPress, isUpper, lootieName, autoPlay, startText, hideButtonWhenSpeaking, animationRef, voiceTooltipText} = props;
  const [t] = useTranslator('components.voiceButton');

  return (
    <>
      {isListening && (
        <View
          style={styles.getActiveCooking(isUpper)}
        >
          <Pressable onPress={onButtonPress}>
            <Animated name="SlideInDown" outName="SlideOutDown">
              <Tooltip isVisible={Boolean(voiceTooltipText)} delay={500} text={voiceTooltipText} placement="top">
                <View style={styles.animationBackground}>
                  <Animation ref={animationRef} autoPlay={false} name="voice" width={80} height={80}/>
                </View>
              </Tooltip>
            </Animated>
          </Pressable>
        </View>)}

      {(!hideButtonWhenSpeaking || !isListening) && (
          <View
              style={styles.getActiveCooking(isUpper)}
          >
            <Pressable onPress={() => {
              Haptics.impactAsync('light');
              onButtonPress?.();
            }}>
              <Animated name="SlideInDown" outName="SlideOutDown">
                <FirstLaunchTooltip asyncStoreKey={VOICE_ASSISTANT_TIP} delay={500} text={t('tip')} placement="top">
                  <View style={styles.animationOffBackground}>
                    <Animation autoPlay={autoPlay} ref={animationRef} name={lootieName} width={Spaces.xxxlarge * 1.5} height={Spaces.xxxlarge * 1.5}/>
                  </View>
                </FirstLaunchTooltip>
              </Animated>
            </Pressable>
          </View>
      )}
    </>
  )
}

VoiceButtonComponent.propTypes = {
  onButtonPress: PropTypes.func,
  isListening: PropTypes.bool,
  startText: PropTypes.string.isRequired,
  hideButtonWhenSpeaking: PropTypes.bool,
  /** @return {import('lottie-react-native').AnimatedLottieView} The converted level **/
  animationRef: PropTypes.object,
  voiceTooltipText: PropTypes.string,
  isUpper: PropTypes.bool,
  autoPlay: PropTypes.bool,
  lootieName: PropTypes.oneOf(['cookOnFire', 'voice']),
};

VoiceButtonComponent.defaultProps = {
  onButtonPress: () => {
  },
  isUpper: false,
  hideButtonWhenSpeaking: true,
  autoPlay: true,
  isListening: false,
  voiceTooltipText: '',
  lootieName: 'cookOnFire',
};

export const VoiceButton = VoiceButtonComponent;