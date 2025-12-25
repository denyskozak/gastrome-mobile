import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import { Colors } from '../../../styles/colors';
import { Spaces } from '../../../styles/spaces';

import styles from './input.styles';
import { Animated } from '../animated/animated.component';
import { FadeOut } from 'react-native-reanimated';

const InputComponent = ({
  onChange,
  onSubmitEditing = () => {
  },
  placeholder = '',
  style = {},
  editable = true,
  value = '',
}) => {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (<SafeAreaView style={[style, styles.container]}>
      <TextInput
        editable={editable}
        style={styles.text}
        onChangeText={value => {
          onChange(value);
          setText(value);
        }}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor={Colors.primary}
        value={text}
      />
      {value && <Animated style={styles.resetIcon} outName="FadeOut">
        <Pressable onPress={() => {
          onChange('');
          setText('');
        }}>
          <Icon name='close-outline' color={Colors.primary} size={Spaces.xlarge}/>
        </Pressable>
      </Animated>}
      {/*TODO check and remove*/}
      {/*<TextInput*/}
      {/*  style={styles.input}*/}
      {/*  onChangeText={onChangeNumber}*/}
      {/*  value={number}*/}
      {/*  placeholder="useless placeholder"*/}
      {/*  keyboardType="numeric"*/}
      {/*/>*/}
    </SafeAreaView>);
};

export const Input = InputComponent;
