import React, { useEffect, useState } from 'react';
import styles from './liner.styles';
import {
  cancelAnimation,
  Easing, FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import { Animated } from '../../animated/animated.component';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { getPercentWidth } from '../../../../styles/common.styles';

const LinerComponent = (props) => {
  const {style, positionMillis, durationMillis} = props;

  const progress = useSharedValue(0);

  useEffect(() => {
    if (positionMillis !== undefined && durationMillis !== undefined) {
      progress.value = withTiming((positionMillis / durationMillis) * getPercentWidth(100), {
        duration: 700,
        easing: Easing.linear,
      });
    }
  }, [durationMillis, positionMillis]);

  const progressBarStyle = useAnimatedStyle(() => {
    return {
      width: progress.value,
    };
  });

  return (
    <Animated.NativeView style={[style, styles.line, progressBarStyle]}/>
  );
};

LinerComponent.propTypes = {
  style: PropTypes.object,
  positionMillis: PropTypes.number.isRequired,
  durationMillis: PropTypes.number.isRequired,
};

LinerComponent.defaultTypes = {
  style: {}
};

export const Liner = LinerComponent;
