import { Animated } from '../../atomic/animated/animated.component';
import styles from './splash-screen.styles';
import {
  Easing, FadeOut,
} from 'react-native-reanimated';
import { AnimatedLogo } from '../../atomic/logo/animated-logo.component';
import {Text, View} from 'react-native';

const SplashScreenComponent = () => {
  const exiting = FadeOut
    .duration(500)
    .easing(Easing.ease);

  return (
    <Animated.NativeView style={styles.container} exiting={exiting}>
        <AnimatedLogo delay={500} duration={750} size="medium" />
    </Animated.NativeView>
  );
};

export const SplashScreen = SplashScreenComponent;