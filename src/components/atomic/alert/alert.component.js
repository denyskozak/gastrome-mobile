import React, { useEffect, useState } from 'react';
import NativeModal from 'react-native-modal';
import { View } from 'react-native';
import { Colors } from '../../../styles/colors';
import styles from './alert.styles';

const AlertComponent = (props) => {
  const {
    onChangeVisible,
    children,
    delay = 4000,
  } = props;

  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    // setTimeout(() => setVisible(false), delay);
  }, []);
  return (
    <NativeModal
      isVisible={isVisible}
      animationInTiming={1000}
      animationOutTiming={1000}
    >
      <View style={styles.container}>
        {children}
      </View>
    </NativeModal>
  );
};

export const Alert = AlertComponent;
