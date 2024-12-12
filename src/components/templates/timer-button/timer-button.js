import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../atomic/button/button.component';
import { useTranslator } from '../../../hooks/useTranslator';

import styles from './timer-button.styles';
import { secondsToMinutesWithTranslations } from '../../../utilities/timeParsers';

const TimerButtonComponent = (props) => {
  const { onPress } = props;
  const [t] = useTranslator('components.timerButton');

  return (
    <Button
      type="outlined"
      size="m"
      style={styles.button}
      textStyle={styles.buttonText}
      title={t('buttonText')}
      onPress={onPress}
    />
  );
}

TimerButtonComponent.propTypes = {
  onPress: PropTypes.func.isRequired
};

export const TimerButton = TimerButtonComponent;