import React, { useEffect } from 'react';
import styles from './liner.styles';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { Animated } from '../../animated/animated.component';
import { getPercentWidth } from '../../../../styles/common.styles';
import {getDevice} from "../../../../utilities/getCurrentDevice";

const LinerComponent = ({
  style = {},
  positionMillis,
  durationMillis,
}) => {

  const progress = useSharedValue(0);

  useEffect(() => {
    if (positionMillis !== undefined && durationMillis !== undefined) {
      progress.value = withTiming(positionMillis / durationMillis, {
        duration: 250,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [durationMillis, positionMillis]);

  const progressBarStyle = useAnimatedStyle(() => {
    return {
      width: progress.value * getPercentWidth(getDevice() === 'iPad' ? 80 : 100),
    };
  });

  return (
    <Animated.NativeView style={[style, styles.line, progressBarStyle]}/>
  );
};

export const Liner = LinerComponent;
