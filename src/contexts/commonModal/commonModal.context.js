import React, { useState, useContext, createContext, useEffect, useCallback } from 'react';
import PropsType from 'prop-types';
import { Text, View } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { Spaces } from '../../styles/spaces';
import { Button } from '../../components/atomic/button/button.component';
import { Modal } from '../../components/atomic/modal/modal.component';
import { useCommonModalStyles } from './commonModal.styles';
import { useTheme } from '../../hooks/useTheme';

export const CommonModalContext = createContext(false);

// Hook
export const useCommonModal = () => {
  const context = useContext(CommonModalContext);

  if (!context) {
    throw new Error('useCommonModal must be used within a CommonModalContext.Provider')
  }

  const {modalConfig, setModalConfig} = context;

  const openCommonModal = (newConfig = {}) => {
    setModalConfig({
      ...modalConfig,
      ...{isOpen: true},
      ...newConfig,
    })
  };

  return [openCommonModal];
};

const defaultValue = {
  isOpen: false,
  icon: '',
  title: '',
  text: '',
  buttonText: 'Ok',
  onPress: null,
  secondButton: {
    text: '',
    onPress: () => {
    },
  }
};

// Component
const CommonModalComponent = (props) => {
  const {
    children,
  } = props;

  const [modalConfig, setModalConfig] = useState({...defaultValue});
  const styles = useCommonModalStyles();
  const { theme } = useTheme();

  const {isOpen, icon, title, text, buttonText, onPress, secondButton} = modalConfig;
  const value = {
    modalConfig,
    setModalConfig
  };

  const close = useCallback(() => setModalConfig({...defaultValue}), [setModalConfig, modalConfig]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setModalConfig({...defaultValue}), 5000);
    }
  }, [isOpen]);

  return (
    <CommonModalContext.Provider value={value}>
      {children}
      <Modal isVisible={isOpen} onChangeVisible={() => close()}>
        <View style={styles.container}>
          <Icon
            name={icon}
            size={Spaces.xxlarge}
            color={theme.colors.white}
          />
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={styles.text}>
            {text}
          </Text>
         <View style={styles.buttons}>
           {secondButton && secondButton.text && (
             <Button
               type="outlined"
               style={styles.button}
               textStyle={styles.buttonText}
               onPress={() => {
                 setModalConfig({...defaultValue});
                 secondButton.onPress instanceof Function ? secondButton.onPress() : null;
               }}
               title={secondButton.text}
             />
           )}
           <Button
             type="outlined"
             style={styles.button}
             textStyle={styles.buttonText}
             onPress={() => onPress instanceof Function ? onPress() : close()}
             title={buttonText}
           />
         </View>
        </View>
      </Modal>
    </CommonModalContext.Provider>
  );
};

CommonModalComponent.propTypes = {
  children: PropsType.object.isRequired,
};

export const CommonModalContextWrapper = CommonModalComponent;