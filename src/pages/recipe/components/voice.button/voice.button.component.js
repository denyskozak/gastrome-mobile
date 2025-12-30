import React, {useEffect, useState} from 'react';
import { Pressable, View, Text } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import { useStyles } from './voice.button.styles';
import { Animation } from '../../../../components/atomic/animation/animation.component';
import { Animated } from '../../../../components/atomic/animated/animated.component';
import { useTranslator } from '../../../../hooks/useTranslator';
import { Tooltip } from '../../../../components/atomic/tooltip/tooltip.component';
import { Button } from '../../../../components/atomic/button/button.component';
import { useTheme } from '../../../../hooks/useTheme';
import {AttentionAnimation} from "../../../../components/molecular/attansion-animation/attansion-animation.component";
import microJSON from "../../../../components/atomic/animation/list/micro-voice.json";
import {Spaces} from "../../../../styles/spaces";
import {FirstLaunchTooltip} from "../../../../components/molecular/first-launch-tooltip/first-launch-tooltip.component";
import {VOICE_ASSISTANT_TIP} from "../../../../constants/asyncStoreKeys";
import * as Haptics from "expo-haptics";

const VoiceButtonComponent = ({
  isListening = false,
  onButtonPress = () => {
  },
  isUpper = false,
  lootieName = 'cookOnFire',
  autoPlay = true,
  startText,
  hideButtonWhenSpeaking = true,
  animationRef,
  voiceTooltipText = '',
}) => {
  const [t] = useTranslator('components.voiceButton');
  const { theme } = useTheme();
  const styles = useStyles(theme);

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

export const VoiceButton = VoiceButtonComponent;
