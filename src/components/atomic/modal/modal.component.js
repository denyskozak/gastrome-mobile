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
    isBlack = true,
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
      <View style={styles.getContainer(isBlack)}>
        {children}
      </View>
    </NativeModal>
  );
};

export const Modal = ModalComponent;
