import React, { useState } from 'react';
import { Text } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { Video } from 'expo-av';

import PropTypes from 'prop-types';
import { Modal } from '../../atomic/modal/modal.component';
import { Button } from '../../atomic/button/button.component';

import styles from './intro-video-modal.styles';
import { Colors } from '../../../styles/colors';

const IntroVideoModalComponent = (props) => {
  const { isOpen, onChangeVisible, title, source } = props;

  return (
    <Modal isVisible={isOpen} onChangeVisible={onChangeVisible}>
      <Text style={styles.title}>{title}</Text>
      <Video
        isLooping
        isMuted
        resizeMode="cover"
        useNativeControls={false}
        shouldPlay
        rate={1.5}
        source={source}
        style={styles.video}
      />
      <Button
        type="outlined"
        style={styles.button}
        onPress={() => {
          onChangeVisible(false);
        }}
      >
        <Icon name="checkmark-outline" size={24} color={Colors.white}/>
      </Button>
    </Modal>
  );
}

IntroVideoModalComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onChangeVisible: PropTypes.func.isRequired,
  source: PropTypes.number.isRequired,
}

export const IntroVideoModal = IntroVideoModalComponent;