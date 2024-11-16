import * as React from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { Animated } from '../../atomic/animated/animated.component';
import PropTypes from 'prop-types';

const AttentionAnimationComponent = (props) => {
  const { delay, children,intensive  } = props;
  // const linear = useSharedValue(start);
    const scale = useSharedValue(1);

    const intensives = {
        1: 1.1,
        2: 1.02,
        3: 1.01
    }
    // Todo remove if not needed - 16 Nov 2024
  // const animatedScaling = useAnimatedStyle(() => {
  //   switch (property) {
  //     case 'scale':
  //       return { transform: [{scale: linear.value}]};
  //     case 'translateX':
  //       return { transform: [{translateX: linear.value}]};
  //     case 'opacity':
  //       return { opacity: linear.value};
  //     default:
  //       return {};
  //   }
  // });
  //
  // useEffect(() => {
  //   linear.value = withRepeat(
  //     withTiming(end, {
  //       duration,
  //       easing: Easing.linear,
  //     }),
  //     -1,
  //     true
  //   );
  // }, []);
  //
  //   const scale = useSharedValue(1);

    React.useEffect(() => {
        // Start the pulsing animation
        scale.value = withRepeat(
            withTiming(intensives[intensive], {
                duration: 1500, // Longer duration for smoother animation
                easing: Easing.inOut(Easing.quad), // Smooth easing
            }),
            -1, // Infinite repeat
            true // Reverse direction
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

  return (
    <Animated.NativeView delay={delay} style={[animatedStyle]}>
      {children}
    </Animated.NativeView>
  )
};

AttentionAnimationComponent.propTypes  = {
 children: PropTypes.element.isRequired,
  delay: PropTypes.number,
    intensive: PropTypes.oneOf([,1,2,3]),
}


AttentionAnimationComponent.defaultProps  = {
  delay: 0,
    intensive: 1,
}

export const AttentionAnimation = AttentionAnimationComponent;
