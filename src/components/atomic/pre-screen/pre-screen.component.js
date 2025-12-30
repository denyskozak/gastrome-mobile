import React from 'react';
import { Image, View } from 'react-native';

import { useStyles } from './pre-screen.styles';
import { useTheme } from '../../../hooks/useTheme';

const iconSource = require('./icon.png');

export const PreScreen = () => {
  const { theme } = useTheme();
  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <Image source={iconSource} style={styles.icon}/>
    </View>
  );
};
