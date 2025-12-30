import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import { Spaces } from '../../../styles/spaces';

import { useStyles } from './input.styles';
import { Animated } from '../animated/animated.component';
import { FadeOut } from 'react-native-reanimated';
import { useTheme } from '../../../hooks/useTheme';

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
  const { theme } = useTheme();
  const styles = useStyles(theme);

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
        placeholderTextColor={theme.colors.primary}
        value={text}
      />
      {value && <Animated style={styles.resetIcon} outName="FadeOut">
        <Pressable onPress={() => {
          onChange('');
          setText('');
        }}>
          <Icon name='close-outline' color={theme.colors.primary} size={Spaces.xlarge}/>
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
