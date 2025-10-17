import React from 'react';
import NativeModal from 'react-native-modal';
import { View } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { useModalStyles } from './modal.styles';

const ModalComponent = (props) => {
  const {
    isVisible = false,
    onChangeVisible,
    children,
    animationTiming = 1000,
    isBlack = true,
  } = props;

  const { theme } = useTheme();
  const { styles: modalStyles, getContainer } = useModalStyles();

  return (
    <NativeModal

      isVisible={isVisible}
      backdropColor={theme.colors.backgroundColor}
      backdropOpacity={0.8}
      animationInTiming={animationTiming}
      animationOutTiming={animationTiming}
      onBackdropPress={() => onChangeVisible instanceof Function && onChangeVisible(false)}
    >
      <View style={[modalStyles.containerBase, getContainer(isBlack)]}>
        {children}
      </View>
    </NativeModal>
  );
};

export const Modal = ModalComponent;
