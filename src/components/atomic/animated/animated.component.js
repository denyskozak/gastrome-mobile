import AnimatedLib, {
  BounceInDown,
  BounceInUp,
  BounceInLeft,
  BounceOutRight,
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  BounceIn,
  FadeOut,
  FlipInEasyY,
  LightSpeedInLeft,
  LightSpeedInRight,
  SlideInDown,
  SlideInUp,
  SlideInRight,
  SlideOutDown,
  SlideOutUp,
  SlideOutRight,
  BounceInRight,
  BounceOutLeft,
  SlideInLeft,
  SlideOutLeft,
  PinwheelIn,
  Easing,
} from 'react-native-reanimated';
import PropTypes from 'prop-types';

const animations = {
  FadeIn,
  FadeInUp,
  FadeInDown,
  BounceInDown, BounceIn,
  BounceInRight,
  BounceInLeft,
  SlideInUp,
  SlideInLeft,
  SlideInRight,
  SlideInDown,
  FadeInLeft,
  BounceInUp,
  FlipInEasyY,
  LightSpeedInRight,
  LightSpeedInLeft,
  PinwheelIn,
};

const animationsOut = {
  SlideOutDown,
  SlideOutUp,
  SlideOutLeft,
  SlideOutRight,
  BounceOutRight,
  BounceOutLeft,
  FadeOut,
};

const AnimatedComponent = (props) => {
  const {children, delay = 0, duration = 500, name = 'FadeIn', outName = 'FadeOut', style = {}} = props;
  const Component = animations[name];

  console.log("Component: ", Component)
  if (!Component) return null;

  const entering = Component
    .duration(duration)
    .delay(delay)
    .easing(Easing.linear);

  const exiting = outName
    ? animationsOut[outName]
      .duration(duration)
      .delay(delay)
      .easing(Easing.linear)
    : null;

  return (
    <AnimatedLib.View style={style} entering={entering} exiting={exiting}>
      {children}
    </AnimatedLib.View>
  );
};

AnimatedComponent.NativeView = AnimatedLib.View;

export const Animated = AnimatedComponent;