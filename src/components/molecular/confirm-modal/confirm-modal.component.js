import Icon from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { View } from 'react-native';

import { Text } from 'react-native';
import { Button } from '../../atomic/button/button.component';
import { Modal } from '../../atomic/modal/modal.component';
import { Spaces } from '../../../styles/spaces';
import styles from './confirm-modal.styles';

const ConfirmModalComponent = ({
  title = 'Are you sure?',
  text = '',
  isOpen,
  onClose,
  onConfirm,
  buttonTitle = 'Ok',
  icon = '',
  isConfirmDisabled = false,
  preContentComponent = null,
}) => {

  return (
    <Modal isVisible={isOpen} onChangeVisible={onClose}>
      {icon && <Icon name={icon} size={Spaces.xxlarge}/>}
      {preContentComponent}
      <Text style={styles.title}>{title}</Text>
      {text && <Text style={styles.text}>{text}</Text>}
      <View style={styles.buttons}>
        <Button
          type="outlined"
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={() => {
            onClose();
          }}
          title="Cancel"
        />
        <Button
          type="outlined"
          disabled={isConfirmDisabled}
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={() => {
            onConfirm();
            onClose();
          }}
          title={buttonTitle}
        />
      </View>
    </Modal>
  )
};

export const ConfirmModal = ConfirmModalComponent;
