import React from 'react';
import NativeModal from 'react-native-modal';
import { View } from 'react-native';
import { Colors } from '../../../styles/colors';
import styles from './modal.styles';

const ModalComponent = (props) => {
  const {
    isVisible = false,
    onChangeVisible,
    children,
    animationTiming = 1000,
  } = props;

  return (
    <NativeModal
      isVisible={isVisible}
      backdropColor={Colors.backdropColor}
      backdropOpacity={0.8}
      animationInTiming={animationTiming}
      animationOutTiming={animationTiming}
      onBackdropPress={() => onChangeVisible instanceof Function && onChangeVisible(false)}
    >
      <View style={styles.container}>
        {children}
      </View>
    </NativeModal>
  );
};

export const Modal = ModalComponent;
