import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import {Video} from 'expo-av';

import {Modal} from '../../atomic/modal/modal.component';
import {Button} from '../../atomic/button/button.component';

import { useStyles } from './intro-video-modal.styles';
import { useTheme } from '../../../hooks/useTheme';

const IntroVideoModalComponent = (props) => {
    const {isOpen, onChangeVisible, title, source} = props;
    const { theme } = useTheme();
    const styles = useStyles(theme);

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
                <Icon name="checkmark-outline" size={24} color={theme.colors.white}/>
            </Button>
        </Modal>
    );
}

export const IntroVideoModal = IntroVideoModalComponent;
