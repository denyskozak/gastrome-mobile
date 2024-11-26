import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from '../animated/animated.component';
import { Logo, LogoSizes } from './logo.component';
import {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
    cancelAnimation,
    Easing,
    withRepeat, withSequence,
} from 'react-native-reanimated';

const AnimatedLogoComponent = (props) => {
    const { delay, duration, size, color, isInfinity } = props;

    const animationDelay = 700 + delay;
    const scale = useSharedValue(1); // Scale starts at 1 (original size)
    const opacity = useSharedValue(1); // Opacity starts fully visible

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: scale.value, // Apply scale transformation
                },
            ],
            opacity: opacity.value, // Adjust opacity
        };
    }, [scale.value, opacity.value]);

    useEffect(() => {
        // Define scale animation sequence
        const scaleAnimation = withSequence(
            withTiming(1.15, {
                duration: duration / 2,
                easing: Easing.bezier(0.42, 0, 0.58, 1), // Smooth cubic-bezier easing
            }),
            withTiming(1.05, {
                duration: duration / 4,
                easing: Easing.bezier(0.42, 0, 0.58, 1),
            }),
            withTiming(1, {
                duration: duration / 4,
                easing: Easing.out(Easing.quad), // Slow easing out
            })
        );

        // Define opacity animation sequence
        const opacityAnimation = withSequence(
            withTiming(0.9, {
                duration: duration / 2,
                easing: Easing.inOut(Easing.ease), // Smooth fade
            }),
            withTiming(1, {
                duration: duration / 2,
                easing: Easing.inOut(Easing.ease),
            })
        );

        if (isInfinity) {
            // Infinite repeating animations
            scale.value = withRepeat(withDelay(animationDelay, scaleAnimation), -1, false);
            opacity.value = withRepeat(withDelay(animationDelay, opacityAnimation), -1, false);
        } else {
            // Single-run animations
            scale.value = withDelay(animationDelay, scaleAnimation);
            opacity.value = withDelay(animationDelay, opacityAnimation);
        }

        return () => {
            cancelAnimation(scale);
            cancelAnimation(opacity);
        };
    }, [isInfinity]);

    return (
        <Animated name="PinwheelIn" delay={delay}>
            <Animated.NativeView style={animatedStyles}>
                <Logo color={color} size={size} duration={duration} />
            </Animated.NativeView>
        </Animated>
    );
};

AnimatedLogoComponent.propTypes = {
    delay: PropTypes.number,
    isInfinity: PropTypes.bool,
    color: PropTypes.oneOf(['white', 'black']),
    duration: PropTypes.number,
    size: PropTypes.oneOf(LogoSizes),
};

AnimatedLogoComponent.defaultProps = {
    delay: 700,
    duration: 1500,
    size: 'small',
    color: 'black',
    isInfinity: false,
};

export const AnimatedLogo = AnimatedLogoComponent;
