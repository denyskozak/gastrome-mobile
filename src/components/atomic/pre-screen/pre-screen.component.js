import React from 'react';
import { Image, View } from 'react-native';

import styles from './pre-screen.styles';

const iconSource = require('./icon.png');

export const PreScreen = () => (
  <View style={styles.container}>
    <Image source={iconSource} style={styles.icon}/>
  </View>
);
