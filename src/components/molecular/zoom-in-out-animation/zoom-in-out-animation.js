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
import {View} from "react-native";

import styles from "./zoom-in-out-animation.styles";

const ZoomInOutComponent = (props) => {
    const {delay, children, enabled, repeatDelay, width, height} = props;


    const scale = useSharedValue(1); // Initial scale value

    useEffect(() => {
        if (enabled) {
            // Start animation with delay between repeats
            scale.value = withRepeat(
                withSequence(
                    // Zoom in
                    withTiming(1.1, {
                        duration: 3000, // 3 seconds to zoom in
                        easing: Easing.inOut(Easing.ease),
                    }),
                    withDelay(repeatDelay, withTiming(1, {
                        duration: 3000, // 3 seconds to zoom out
                        easing: Easing.inOut(Easing.ease),
                    })),// Add a delay between cycles
                ),
                -1, // Infinite repeat
                true // No reverse (sequence handles reversing)
            );
        } else {
            // Reset to default scale when disabled
            scale.value = 1;
        }
    }, [enabled, repeatDelay]); // Re-run effect when `enabled` or `repeatDelay` changes

    // Animated style for the image
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{scale: scale.value}], // Apply the scale transformation
        };
    });

    return (
        <View style={styles.getImageWrapper(width, height)}>
            <Animated.NativeView delay={delay} style={[animatedStyle]}>
                {children}
            </Animated.NativeView>
        </View>

    )
};

ZoomInOutComponent.propTypes = {
    children: PropTypes.element.isRequired,
    delay: PropTypes.number,
    enabled: PropTypes.bool,
    repeatDelay: PropTypes.number,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}


ZoomInOutComponent.defaultProps = {
    enabled: false,
    repeatDelay: 1000,
}

export const ZoomInOut = ZoomInOutComponent;
