import * as React from 'react';
import {Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming} from 'react-native-reanimated';
import {useEffect} from 'react';
import {Animated} from '../../atomic/animated/animated.component';
import PropTypes from 'prop-types';

const AttentionAnimationComponent = (props) => {
    const {delay, children, intensive} = props;
    // const linear = useSharedValue(start);
    const scale = useSharedValue(1);

    const intensives = {
        1: 1.01,
        2: 1.02,
        3: 1.1
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
        // Adding a delay before starting the animation
        const startAnimation = () => {
            scale.value = withSequence(
                withTiming(intensives[intensive], {
                    duration: 1500, // Duration for the scaling up
                    easing: Easing.inOut(Easing.quad), // Smooth easing
                }),
                withTiming(1, {
                    duration: 1500, // Duration for scaling back to original size
                    easing: Easing.inOut(Easing.quad), // Smooth easing
                })
            );
        };

        if (delay > 0) {
            setTimeout(() => {
                startAnimation();
            }, delay);
        } else {
            startAnimation();
        }

        // Repeating animation manually with setInterval to introduce delay between repeats
        const interval = setInterval(() => {
            startAnimation();
        }, 1500 * 2 + delay); // Full cycle (up + down) duration plus delay

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [delay, intensives, intensive, scale]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{scale: scale.value}],
        };
    });

    return (
        <Animated.NativeView delay={delay} style={[animatedStyle]}>
            {children}
        </Animated.NativeView>
    )
};

AttentionAnimationComponent.propTypes = {
    children: PropTypes.element.isRequired,
    delay: PropTypes.number,
    intensive: PropTypes.oneOf([1, 2, 3]),
}


AttentionAnimationComponent.defaultProps = {
    delay: 0,
    intensive: 1,
}

export const AttentionAnimation = AttentionAnimationComponent;
