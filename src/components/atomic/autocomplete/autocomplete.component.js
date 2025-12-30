import React, { useState } from 'react';
import { Text, View } from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import { getAutocompleteColors, useStyles } from './autocomplete.styles';
import { useTranslator } from '../../../hooks/useTranslator';
import { useTheme } from '../../../hooks/useTheme';

const AutocompleteComponent = ({
  items,
  onChange,
  onConfirm,
  selectToggleIconComponent,
  selectText,
  styles = {},
}) => {

  const [t] = useTranslator('components.autocomplete');
  const [list, setList] = useState([]);
  const { theme } = useTheme();
  const autoStyles = useStyles(theme);
  const autocompleteColors = getAutocompleteColors(theme);

  const handleChangeList = (newList) => {
    setList(newList);
    onChange(newList);
  };

  const renderSelectText = () => (
    <View style={styles.selectContainer}>
     <Text style={autoStyles.selectText}>{selectText}</Text>
    </View>
  );

  return (
    <SectionedMultiSelect
      alwaysShowSelectText
      removeAllText={t('removeAll')}
      searchPlaceholderText={t('name')}
      confirmText={t('applyText')}
      displayKey="title"
      colors={autocompleteColors}
      IconRenderer={Icon}
      items={items}
      modalWithTouchable
      onConfirm={onConfirm}
      onSelectedItemsChange={handleChangeList}
      persistentScrollbar
      readOnlyHeadings
      renderSelectText={renderSelectText}
      selectedItems={list}
      selectToggleIconComponent={selectToggleIconComponent}
      showDropDowns
      showsVerticalScrollIndicator
      styles={styles}
      subKey="children"
      uniqueKey="id"
    />
  );
};

export const Autocomplete = AutocompleteComponent;
