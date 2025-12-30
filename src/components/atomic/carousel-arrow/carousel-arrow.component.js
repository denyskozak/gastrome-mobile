import * as React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  Extrapolate,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Icon from '@expo/vector-icons/Ionicons';
import { Spaces } from '../../../styles/spaces';
import { useTheme } from '../../../hooks/useTheme';

export const ArrowDirection = {
  IS_VERTICAL: 0,
  IS_HORIZONTAL: 1,
}

export const Arrow = ({directionAnim}) => {
  const translateAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(0);
  const { theme } = useTheme();

  const arrowStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            translateAnim.value,
            [0, 1],
            [0, -80],
          ),
        },
        {
          scale: interpolate(scaleAnim.value, [0, 1], [1, 0.8]),
        },
      ],
    };
  }, []);

  const arrowContainerUpStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY:-300},
        {
          rotateZ: `${interpolate(
            directionAnim.value,
            [0, 1],
            [0, 90],
            Extrapolate.EXTEND,
          )}deg`,
        },
      ],
    };
  }, [translateAnim]);

  const arrowContainerDownStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${interpolate(
            directionAnim.value,
            [0, 1],
            [180, 270],
            Extrapolate.EXTEND,
          )}deg`,
        },
      ],
    };
  }, [translateAnim]);

  useAnimatedReaction(
    () => scaleAnim.value,
    (scale) => {
      if (scale > 0) {
        cancelAnimation(translateAnim);
      } else {
        translateAnim.value = withSequence(
          withTiming(0, {duration: 300}),
          withRepeat(withSpring(0.7), -1, true),
        );
      }
    },
    [],
  );

  const IconComponent = <Icon name='arrow-up' color={theme.colors.primary} size={Spaces.xxlarge}/>;

  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        scaleAnim.value = withSpring(1);
      }}
      onPressOut={() => {
        scaleAnim.value = withSpring(0);
      }}
      onPress={() => {
        directionAnim.value = withTiming((directionAnim.value + 1) % 2);
      }}
    >
      <Animated.View
        style={[arrowContainerUpStyle, {width: '100%', height: 150}]}
      >
        <Animated.View
          resizeMode='center'
          style={[arrowStyle, {height: '100%'}]}
        >
          {IconComponent}
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={[
          arrowContainerDownStyle,
          {width: '100%', height: 150},
        ]}
      >
        <Animated.View
          resizeMode='center'
          style={[arrowStyle, {height: '100%'}]}
        >
          {IconComponent}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
