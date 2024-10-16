import { Text, Linking } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { Button } from '../../atomic/button/button.component';
import { Spaces } from '../../../styles/spaces';
import { Modal } from '../../atomic/modal/modal.component';

import styles from './permission-modal.styles';
import { useTranslator } from '../../../hooks/useTranslator';

const PermissionModalComponent = ({ isVisible, onChangeVisible, onPress }) => {
  const [t] = useTranslator('components.voicePermission');

  return (
    <Modal isVisible={isVisible} onChangeVisible={onChangeVisible}>
      <Icon name="mic-off-outline" size={Spaces.xxlarge}/>
      {/*TODO replace translation*/}
      <Text style={styles.helpModalTitle}>
        {t('text')}
      </Text>
      <Button
        style={styles.helpModalButton}
        textStyle={styles.helpModalButtonText}
        onPress={() => Linking.openSettings()}
        title={t('button')}
      />
      <Button
        type="outlined"
        style={styles.helpModalButton}
        onPress={onPress}
        title={t('close')}
      />
    </Modal>
  )
}

export const PermissionModal = PermissionModalComponent;
