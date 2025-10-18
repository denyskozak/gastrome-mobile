import React, { useRef } from 'react';
import { Animated } from 'react-native';

export const useAnimation = (actions = [], initial = 0) => {
  const animation = useRef(new Animated.Value(initial)).current;

  const run = () => {
    const sequence = actions.map(({toValue, duration, useNativeDriver = true}) =>
      Animated.timing(animation, {
        toValue,
        duration,
        useNativeDriver,
      })
    );
    Animated.sequence(sequence).start();

  }

  return [animation, run]
};

