import { Text } from 'react-native';
import { Button } from '../../atomic/button/button.component';
import { Modal } from '../../atomic/modal/modal.component';

import styles from './measure-modal.styles';
import { useTranslator } from '../../../hooks/useTranslator';
import React from 'react';

const MeasureModalComponent = ({ isVisible, currentMeasure, onChangeVisible, onPress }) => {
  const [t] = useTranslator('components.measuresModal');

  const measures = [
    'g',
    'oz',
    'tbsp'
  ];

  return (
    <Modal isVisible={isVisible} onChangeVisible={onChangeVisible}>
      <Text style={styles.title}>
        {t('title')}
      </Text>
      {measures.map(measure => (
        <Button
          key={measure}
          type="outlined"
          style={styles.button}
          textStyle={styles.buttonText}
          selected={measure === currentMeasure}
          onPress={() => {onPress(measure)}}
        >
          {t(measure)}
        </Button>
      ))}
      <Button
        type="outlined"
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={() => {onChangeVisible(false)}}
        title={t('close')}
      />

    </Modal>
  )
}

export const MeasureModal = MeasureModalComponent;
