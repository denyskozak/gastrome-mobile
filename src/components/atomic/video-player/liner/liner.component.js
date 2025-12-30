import React, { useEffect, useState } from 'react';
import { useStyles } from './liner.styles';
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
import { Dimensions } from 'react-native';
import { getPercentWidth } from '../../../../styles/common.styles';
import {getDevice} from "../../../../utilities/getCurrentDevice";
import { useTheme } from '../../../../hooks/useTheme';

const LinerComponent = ({
  style = {},
  positionMillis,
  durationMillis,
}) => {
  const { theme } = useTheme();
  const styles = useStyles(theme);

  const progress = useSharedValue(0);

  useEffect(() => {
    if (positionMillis !== undefined && durationMillis !== undefined) {
      progress.value = withTiming((positionMillis / durationMillis) * getPercentWidth( getDevice() === 'iPad' ? 80 : 100), {
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

export const Liner = LinerComponent;
