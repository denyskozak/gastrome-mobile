import Icon from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { Text } from 'react-native';
import { Button } from '../../atomic/button/button.component';
import { Modal } from '../../atomic/modal/modal.component';
import { Spaces } from '../../../styles/spaces';
import styles from './confirm-modal.styles';

const ConfirmModalComponent = (props) => {
  const {
    title,
    text,
    isOpen,
    onClose,
    onConfirm,
    buttonTitle,
    icon,
    isConfirmDisabled,
    preContentComponent
  } = props;

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
          onPress={() => {
            onClose();
          }}
          title="Cancel"
        />
        <Button
          type="outlined"
          disabled={isConfirmDisabled}
          style={styles.button}
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

ConfirmModalComponent.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  buttonTitle: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  icon: PropTypes.string,
  isConfirmDisabled: PropTypes.bool,
  preContentComponent: PropTypes.node,
};

ConfirmModalComponent.defaultProps = {
  preContentComponent: null,
  isConfirmDisabled: false,
  title: 'Are you sure?',
  icon: '',
  text: '',
  buttonTitle: 'Ok',
};

export const ConfirmModal = ConfirmModalComponent;