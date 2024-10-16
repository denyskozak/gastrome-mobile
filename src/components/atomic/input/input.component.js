import React, { useEffect, useState } from 'react';
import PropsType from 'prop-types';
import { Pressable, SafeAreaView, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import { Colors } from '../../../styles/colors';
import { Spaces } from '../../../styles/spaces';

import styles from './input.styles';
import { Animated } from '../animated/animated.component';
import { FadeOut } from 'react-native-reanimated';

const InputComponent = (props) => {
  const {onChange, onSubmitEditing, placeholder, style, editable, value} = props;
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

InputComponent.propTypes = {
  type: PropsType.oneOf(['clear', 'outlined', 'contained']),
  onChange: PropsType.func.isRequired,
  onSubmitEditing: PropsType.func,
  disabled: PropsType.bool,
  value: PropsType.string,
  placeholder: PropsType.string,
  style: PropsType.object,
};

InputComponent.defaultProps = {
  type: 'clear', placeholder: '', value: '', style: {}, onSubmitEditing: () => {
  }, editable: true,
};

export const Input = InputComponent;