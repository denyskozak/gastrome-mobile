import React, { useCallback } from 'react';

import { Button } from '../../atomic/button/button.component';
import { useTranslator } from '../../../hooks/useTranslator';

import { useStyles } from './timer-button.styles';
import { secondsToMinutesWithTranslations } from '../../../utilities/timeParsers';
import { useTheme } from '../../../hooks/useTheme';

const TimerButtonComponent = (props) => {
  const { onPress } = props;
  const [t] = useTranslator('components.timerButton');
  const { theme } = useTheme();
  const styles = useStyles(theme);

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
