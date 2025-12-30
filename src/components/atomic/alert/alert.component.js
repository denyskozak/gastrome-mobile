import React, { useEffect, useState } from 'react';
import NativeModal from 'react-native-modal';
import { View } from 'react-native';
import { useStyles } from './alert.styles';
import { useTheme } from '../../../hooks/useTheme';

const AlertComponent = (props) => {
  const {
    onChangeVisible,
    children,
    delay = 4000,
  } = props;

  const [isVisible, setVisible] = useState(true);
  const { theme } = useTheme();
  const styles = useStyles(theme);

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
