import React from 'react';
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

const VoiceButtonComponent = (props) => {
  const {isListening, onButtonPress, startText, hideButtonWhenSpeaking, animationRef, voiceTooltipText} = props;
  const [t] = useTranslator('components.voiceButton');

  return (
    <>
      {isListening && (
        <View
          style={styles.activeCooking}
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
        <Animated name="FadeIn" outName="FadeOut">
          <AttentionAnimation intensive={2}>
          <Button
            animate
            type="wide"
            onPress={onButtonPress}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
                <Icon name="mic-outline" size={24} color={Colors.second}/>
              {'  '}
              {!isListening ? startText : t('listenActive')}
            </Text>
          </Button>
          </AttentionAnimation>
        </Animated>
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
};

VoiceButtonComponent.defaultProps = {
  onButtonPress: () => {
  },
  hideButtonWhenSpeaking: true,
  isListening: false,
  voiceTooltipText: '',
};

export const VoiceButton = VoiceButtonComponent;