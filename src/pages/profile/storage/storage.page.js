import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

import { useTranslator } from '../../../hooks/useTranslator';
import { Button } from '../../../components/atomic/button/button.component';

import { useCommonModal } from '../../../contexts/commonModal/commonModal.context';
import styles from './storage.styles';
import { ConfirmModal } from '../../../components/molecular/confirm-modal/confirm-modal.component';

const StoragePageComponent = () => {
  const [
    t,
  ] = useTranslator('pages.storage');

  const [size, setSize] = useState(0);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [openCommonModal] = useCommonModal();

  useEffect(() => {
    FileSystem.getInfoAsync(FileSystem.documentDirectory)
      .then((info) => {
        setSize(info.size)
      });
  }, []);

  const bytesToMB = (bytesValue) => {
    return Number(bytesValue / (1024 * 1024)).toFixed(2); // 1 MB = 1024 * 1024 bytes
  }

  const deleteFile = file => FileSystem.deleteAsync(`${FileSystem.documentDirectory}${file}`);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('usedSize', {size: bytesToMB(size)})}</Text>
      <Button
        size="m"
        type="outlined"
        onPress={() => {
          setConfirmModalOpen(true);
        }}
      >
        {t('clean')}
      </Button>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title={t('sure')}
        buttonTitle={t('ok')}
        onConfirm={() => {
          FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
            .then(
              (list) =>
                Promise.all(
                  list.map(deleteFile)
                )
            )
            .then(() => {
              openCommonModal({
                icon: 'checkmark-done-outline',
                title: t('cleanTitle'),
                text: t('cleanDescription'),
              });
              setSize(0);
            })
            .catch()
        }}
        onClose={() => setConfirmModalOpen(false)}
      />
    </View>
  );
};

export const StoragePage = StoragePageComponent;