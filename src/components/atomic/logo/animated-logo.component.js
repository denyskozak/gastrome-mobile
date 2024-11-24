import {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Animated} from '../animated/animated.component';
import {Logo, LogoSizes} from './logo.component';
import {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
    cancelAnimation,
    Easing, FadeIn, withRepeat,
} from 'react-native-reanimated';

const AnimatedLogoComponent = (props) => {
    const {delay, duration, size,color} = props;

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
        // Modern pulse animation with slight overshoot and opacity change
        scale.value = withDelay(
            delay,
            withTiming(1.15, {
                duration: duration / 2,
                easing: Easing.bezier(0.42, 0, 0.58, 1), // Smooth cubic-bezier easing
            }, () => {
                // Add a small overshoot effect before returning to original size
                scale.value = withTiming(1.05, {
                    duration: duration / 4,
                    easing: Easing.bezier(0.42, 0, 0.58, 1),
                }, () => {
                    // Finally, settle back to the original size
                    scale.value = withTiming(1, {
                        duration: duration / 4,
                        easing: Easing.out(Easing.quad), // Slow easing out
                    });
                });
            })
        );

        // Simultaneous opacity pulse
        opacity.value = withDelay(
            delay,
            withTiming(0.9, {
                duration: duration / 2,
                easing: Easing.inOut(Easing.ease), // Smooth fade in and out
            }, () => {
                opacity.value = withTiming(1, {
                    duration: duration / 2,
                    easing: Easing.inOut(Easing.ease),
                });
            })
        );

        return () => {
            cancelAnimation(scale);
            cancelAnimation(opacity);
        };
    }, []);


    return (
        <Animated name="PinwheelIn" style={animatedStyles} >
            <Logo color={color} size={size}/>
        </Animated>
    );
};

AnimatedLogoComponent.propTypes = {
    delay: PropTypes.number,
    color: PropTypes.oneOf(['white', 'black']),
    duration: PropTypes.number,
    size: PropTypes.oneOf(LogoSizes),
}

AnimatedLogoComponent.defaultProps = {
    delay: 1500,
    duration: 1500,
    size: 'small',
    color: 'black'
}

export const AnimatedLogo = AnimatedLogoComponent;