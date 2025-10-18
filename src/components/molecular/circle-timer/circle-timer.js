import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Spaces } from '../../../styles/spaces';
import { Colors } from '../../../styles/colors';
import styles from './circle-timer.styles';
import { secondsToMinutesTimer } from '../../../utilities/timeParsers';

const CircleTimerComponent = (props) => {
  const { size, duration, onComplete } = props;

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying
        size={size}
        duration={duration}
        trailStrokeWidth={Spaces.xsmall}
        strokeWidth={Spaces.xsmall}
        colors={[Colors.black]}
        trailColor={Colors.white}
        onComplete={onComplete}
      >
        {({ remainingTime }) => <Text style={styles.countText}>{secondsToMinutesTimer(remainingTime)}</Text>}
      </CountdownCircleTimer>
    </View>
  );
}

CircleTimerComponent.propTypes = {
  size: PropTypes.number,
  duration: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired
}

CircleTimerComponent.defaultProps = {
  size: 100
}
export const CircleTimer = CircleTimerComponent;