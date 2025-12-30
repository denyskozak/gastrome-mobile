import React from 'react';
import { Text, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Spaces } from '../../../styles/spaces';
import { useStyles } from './circle-timer.styles';
import { secondsToMinutesTimer } from '../../../utilities/timeParsers';
import { useTheme } from '../../../hooks/useTheme';

const CircleTimerComponent = ({
  size = 100,
  duration,
  onComplete,
}) => {
  const { theme } = useTheme();
  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying
        size={size}
        duration={duration}
        trailStrokeWidth={Spaces.xsmall}
        strokeWidth={Spaces.xsmall}
        colors={[theme.colors.black]}
        trailColor={theme.colors.white}
        onComplete={onComplete}
      >
        {({ remainingTime }) => <Text style={styles.countText}>{secondsToMinutesTimer(remainingTime)}</Text>}
      </CountdownCircleTimer>
    </View>
  );
}
export const CircleTimer = CircleTimerComponent;
