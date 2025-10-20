import React from 'react';
import PropsType from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';

import { StyleType } from '../../../types/style.types';
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

ButtonComponent.propTypes = {
  title: PropsType.string,
  type: PropsType.oneOf(['clear', 'outlined', 'contained', 'fulled', 'wide']),
  highlight: PropsType.bool,
  style: StyleType,
  textStyle: StyleType,
  disabled: PropsType.bool,
  onPress: PropsType.func,
  size: PropsType.oneOf(['s', 'm', 'l', 'xl']),
  selected: PropsType.bool,
};


export const Button = ButtonComponent;
