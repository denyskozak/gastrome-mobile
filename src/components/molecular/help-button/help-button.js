import React from 'react';
import Icon from '@expo/vector-icons/Ionicons';

import { Colors } from '../../../styles/colors';
import { Button } from '../../atomic/button/button.component';

import styles from './help-button.styles';

const HelpButtonComponent = (props) => {
  const { onPress } = props;

  return (
    <Button style={styles.container} type="outlined" size="s" onPress={onPress}>
      <Icon name="help-outline" size={18} color={Colors.white}/>
    </Button>
  );
}

export const HelpButton = HelpButtonComponent;