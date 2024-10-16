import { Text, Linking } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { Button } from '../../atomic/button/button.component';
import { Spaces } from '../../../styles/spaces';
import { Modal } from '../../atomic/modal/modal.component';

import styles from './volume-modal.styles';
import { useTranslator } from '../../../hooks/useTranslator';
import PropTypes from 'prop-types';

const VolumeModalComponent = ({ isVisible, onChangeVisible, onTryAgainPress, onPress }) => {
  const [t] = useTranslator('components.volumeModal');

  return (
    <Modal isVisible={isVisible} onChangeVisible={onChangeVisible}>
      <Icon name="volume-high-outline" size={Spaces.xxlarge}/>
      {/*TODO replace translation*/}
      <Text style={styles.helpModalTitle}>
        {t('text')}
      </Text>
      <Button
        style={styles.helpModalButton}
        textStyle={styles.helpModalButtonText}
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

VolumeModalComponent.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onChangeVisible: PropTypes.func.isRequired,
  onTryAgainPress: PropTypes.func.isRequired,
}
export const VolumeModal = VolumeModalComponent;
