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
  const {children, delay, duration, name, outName, style} = props;
  const Component = animations[name];

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

AnimatedComponent.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.oneOf(Object.keys(animations)),
  outName: PropTypes.oneOf([...Object.keys(animationsOut), '']),
  delay: PropTypes.number,
  duration: PropTypes.number,
  style: PropTypes.object,
};

AnimatedComponent.defaultProps = {
  name: 'FadeIn',
  outName: 'FadeOut',
  delay: 0,
  duration: 500,
  style: {},
};

AnimatedComponent.NativeView = AnimatedLib.View;

export const Animated = AnimatedComponent;