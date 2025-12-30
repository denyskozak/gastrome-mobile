import React from 'react';
import Icon from '@expo/vector-icons/Ionicons';

import { Button } from '../../atomic/button/button.component';

import { useStyles } from './help-button.styles';
import { useTheme } from '../../../hooks/useTheme';

const HelpButtonComponent = (props) => {
  const { onPress } = props;
  const { theme } = useTheme();
  const styles = useStyles(theme);

  return (
    <Button style={styles.container} type="outlined" size="s" onPress={onPress}>
      <Icon name="help-outline" size={18} color={theme.colors.white}/>
    </Button>
  );
}

export const HelpButton = HelpButtonComponent;
