import { Animated } from '../../atomic/animated/animated.component';
import { useStyles } from './splash-screen.styles';
import {
  Easing, FadeOut,
} from 'react-native-reanimated';
import { AnimatedLogo } from '../../atomic/logo/animated-logo.component';
import {Text, View} from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import {useEffect, useState} from "react";

const SplashScreenComponent = () => {
  const exiting = FadeOut
    .duration(500)
    .easing(Easing.ease);
  const { theme } = useTheme();
  const styles = useStyles(theme);
    const [loadIssue, setLoadIssue] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoadIssue(true)
        }, 6 * 1000);

        return () => {
            clearTimeout(timeoutId);
        }
    }, []);
  return (
    <Animated.NativeView style={styles.container} exiting={exiting}>
        <AnimatedLogo delay={500} duration={750} size="medium" />
      <Animated delay={400}>
        <Text style={styles.title}>Gastro & Me</Text>
      </Animated>
        {loadIssue ? (<Animated delay={100}>
        <Text style={styles.subtitle}>Video Loading Issue. Check Network Connection</Text>
      </Animated>) : null}

    </Animated.NativeView>
  );
};

export const SplashScreen = SplashScreenComponent;
