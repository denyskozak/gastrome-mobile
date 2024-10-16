import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../atomic/button/button.component';
import { useTranslator } from '../../../hooks/useTranslator';

import styles from './timer-button.styles';
import { secondsToMinutesWithTranslations } from '../../../utilities/timeParsers';

const TimerButtonComponent = (props) => {
  const { onPress, duration } = props;
  const [t] = useTranslator('components.timerButton');

  return (
    <Button
      type="outlined"
      style={styles.button}
      textStyle={styles.buttonText}
      title={t('buttonText', {duration} )}
      onPress={onPress}
    />
  );
}

TimerButtonComponent.propTypes = {
  duration: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export const TimerButton = TimerButtonComponent;