import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { useButtonStyles } from './button.styles';

const ButtonComponent = ({
  onPress = () => {},
  title = '',
  style = {},
  textStyle = {},
  highlight = false,
  children,
  type = 'clear',
  disabled = false,
  selected = false,
  size = '',
}) => {

  const upperCaseSize = size.toUpperCase();
  const styles = useButtonStyles();

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disabled} style={[
      // { backgroundColor: animate ? backgroundColorAnimation : Colors.primary },
      styles.container,
      styles[`container${upperCaseSize}`] ? styles[`container${upperCaseSize}`] : null,
      type === 'outlined' ? styles.outlined : null,
      type === 'contained' ? styles.contained : null,
      type === 'fulled' ? styles.fulled : null,
      type === 'wide' ? styles.wide : null,
      selected ? styles.selected : null,
      disabled ? styles.disabledContainer : null,
      style,
    ]}>
        <Text style={[
          styles.text,
          highlight ? styles.highlight : null,
          type === 'outlined' ? styles.textOutlined : null,
          type === 'contained' ? styles.textContained : null,
          type === 'fulled' ? styles.textFulled : null,
          type === 'wide' ? styles.wideText : null,
          disabled ? styles.textDisabled : null,
          selected ? styles.textSelected : null,
          textStyle,
        ]}>
          {children || title}
        </Text>
    </TouchableOpacity>
  );
};


export const Button = ButtonComponent;
