import React from 'react';
import Icon from '@expo/vector-icons/Ionicons';

import { Button } from '../../atomic/button/button.component';

import { useStyles } from './help-button.styles';
import { useTheme } from '../../../hooks/useTheme';
import {Spaces} from "../../../styles/spaces";
import {TouchableOpacity} from "react-native";

const HelpButtonComponent = (props) => {
  const { onPress } = props;
  const { theme } = useTheme();
  const styles = useStyles(theme);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name="help-outline" size={Spaces.xlarge} color={theme.colors.white}/>
    </TouchableOpacity>
  );
}

export const HelpButton = HelpButtonComponent;
