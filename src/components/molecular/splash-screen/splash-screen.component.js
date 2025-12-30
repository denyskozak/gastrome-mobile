import { Animated } from '../../atomic/animated/animated.component';
import { useStyles } from './splash-screen.styles';
import {
  Easing, FadeOut,
} from 'react-native-reanimated';
import { AnimatedLogo } from '../../atomic/logo/animated-logo.component';
import {Text, View} from 'react-native';
import { useTheme } from '../../../hooks/useTheme';

const SplashScreenComponent = () => {
  const exiting = FadeOut
    .duration(500)
    .easing(Easing.ease);
  const { theme } = useTheme();
  const styles = useStyles(theme);

  return (
    <Animated.NativeView style={styles.container} exiting={exiting}>
        <AnimatedLogo delay={500} duration={750} size="medium" />
      <View >
        <Text style={styles.title}>Gastro & Me</Text>
      </View>
    </Animated.NativeView>
  );
};

export const SplashScreen = SplashScreenComponent;
