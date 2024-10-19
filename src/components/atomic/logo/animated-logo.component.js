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
    const {style, delay, duration, size, isInfinity} = props;

    const rotation = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotateZ: `${rotation.value}deg`,
                },
            ],
        };
    }, [rotation.value]);

    useEffect(() => {
        rotation.value = withDelay(
            delay,
            withRepeat(
                withTiming(360, {
                    duration,
                    easing: Easing.linear,
                }),
                isInfinity ? -1 : 1,
                false
            )
        );

        return () => cancelAnimation(rotation);
    }, []);

    const entering = FadeIn
        .delay(500)
        .duration(500)
        .easing(Easing.ease);

    return (
        <Animated.NativeView style={[style, animatedStyles]} entering={entering}>
            <Logo size={size}/>
        </Animated.NativeView>
    );
};

AnimatedLogoComponent.propTypes = {
    style: PropTypes.object,
    isInfinity: PropTypes.bool,
    delay: PropTypes.number,
    duration: PropTypes.number,
    size: PropTypes.oneOf(LogoSizes),

}

AnimatedLogoComponent.defaultProps = {
    style: {},
    isInfinity: false,
    delay: 1500,
    duration: 1500,
    size: 'small',
}

export const AnimatedLogo = AnimatedLogoComponent;