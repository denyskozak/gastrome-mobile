import React, { useCallback } from 'react';

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

export const TimerButton = TimerButtonComponent;
