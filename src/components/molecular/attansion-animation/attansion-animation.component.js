import * as React from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { Animated } from '../../atomic/animated/animated.component';
import PropTypes from 'prop-types';

const AttentionAnimationComponent = (props) => {
  const { delay, duration, property = 'scale', start, end, children } = props;
  const linear = useSharedValue(start);

  const animatedScaling = useAnimatedStyle(() => {
    switch (property) {
      case 'scale':
        return { transform: [{scale: linear.value}]};
      case 'translateX':
        return { transform: [{translateX: linear.value}]};
      case 'opacity':
        return { opacity: linear.value};
      default:
        return {};
    }
  });

  useEffect(() => {
    linear.value = withRepeat(
      withTiming(end, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      true
    );
  }, []);

  return (
    <Animated.NativeView delay={delay} style={animatedScaling}>
      {children}
    </Animated.NativeView>
  )
};

AttentionAnimationComponent.propTypes  = {
 children: PropTypes.element.isRequired,
  delay: PropTypes.number,
  start: PropTypes.number,
  end: PropTypes.number,
  scale: PropTypes.number,
  duration: PropTypes.number,
  property: PropTypes.oneOf(['translateX', 'scale', 'opacity']),
}


AttentionAnimationComponent.defaultProps  = {
  delay: 0,
  start: 1,
  end: 1.1,
  duration: 1000,
  property: 'scale'
}

export const AttentionAnimation = AttentionAnimationComponent;
