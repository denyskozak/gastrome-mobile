import { Text, Linking } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { Button } from '../../atomic/button/button.component';
import { Spaces } from '../../../styles/spaces';
import { Modal } from '../../atomic/modal/modal.component';

import styles from './volume-modal.styles';
import { useTranslator } from '../../../hooks/useTranslator';
import {Colors} from "../../../styles/colors";

const VolumeModalComponent = ({ isVisible, onChangeVisible, onTryAgainPress, onPress }) => {
  const [t] = useTranslator('components.volumeModal');

  return (
    <Modal isVisible={isVisible} onChangeVisible={onChangeVisible}>
      <Icon name="volume-high-outline" size={Spaces.xxlarge} color={Colors.white}/>
      {/*TODO replace translation*/}
      <Text style={styles.helpModalTitle}>
        {t('text')}
      </Text>
      <Button
        style={styles.helpModalButton}
        onPress={onTryAgainPress}
        title={t('tryAgain')}
      />
      <Button
        type="outlined"
        style={styles.helpModalButton}
        onPress={() => {
          onChangeVisible(false);
        }}
        title={t('close')}
      />
    </Modal>
  )
}

export const VolumeModal = VolumeModalComponent;
