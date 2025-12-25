import * as React from 'react';
import {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';
import {useEffect} from 'react';
import {Animated} from '../../atomic/animated/animated.component';
import PropTypes from 'prop-types';


const AttentionAnimationComponent = (props) => {
    const {enabled = true, delay = 0, duration = 1000, property = 'scale', start = 1, end = 1.1, children} = props;
    const linear = useSharedValue(start);

    const animatedScaling = useAnimatedStyle(() => {
        switch (property) {
            case 'scale':
                return {transform: [{scale: linear.value}]};
            case 'translateX':
                return {transform: [{translateX: linear.value}]};
            case 'translateY':
                return {transform: [{translateY: linear.value}]};
            case 'opacity':
                return {opacity: linear.value};
            default:
                return {};
        }
    });

    useEffect(() => {
        if (enabled) {
            linear.value = withRepeat(
                withSequence(
                    withTiming(start, {
                        duration,
                        easing: Easing.linear,
                    }),
                    withDelay(delay, withTiming(end, {
                        duration,
                        easing: Easing.linear,
                    }))
                ),
                -1,
                true
            );
        } else {
            linear.value = start;
        }

    }, [enabled]);

    return (
        <Animated.NativeView delay={delay} style={animatedScaling}>
            {children}
        </Animated.NativeView>
    )
};

export const AttentionAnimation = AttentionAnimationComponent;
