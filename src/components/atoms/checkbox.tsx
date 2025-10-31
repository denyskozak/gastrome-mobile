import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import { Colors } from '../../styles/colors';
import { Spaces } from '../../styles/spaces';
import { BorderRadius } from '../../styles/borderRadiuses';
import { getTextStyles } from '../../styles/common.styles';

import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CheckboxProps = {
  label: string;
  checked?: boolean;
  onPress?: () => void;
  description?: React.ReactNode;
  helper?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

const renderNode = (value: React.ReactNode, defaultStyle: StyleProp<TextStyle>) => {
  if (!value) {
    return null;
  }

  if (typeof value === 'string') {
    return <Text style={[defaultStyle]}>{value}</Text>;
  }

  return value;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onPress,
  description,
  helper,
  style,
  labelStyle,
}) => {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked ? <Icon name="checkmark" size={16} color={Colors.second} /> : null}
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        {renderNode(description, styles.description)}
        {renderNode(helper, styles.helper)}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spaces.small,
    paddingHorizontal: Spaces.medium,
  },
  checkbox: {
    width: Spaces.large,
    height: Spaces.large,
    borderRadius: BorderRadius.small,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spaces.small,
    backgroundColor: Colors.black,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  textContainer: {
    flex: 1,
  },
  label: getTextStyles({
    fontSize: 18,
    color: Colors.white,
  }),
  description: getTextStyles({
    fontSize: 14,
    color: Colors.primary,
  }),
  helper: getTextStyles({
    fontSize: 14,
    color: Colors.primary,
  }),
});

export default Checkbox;
