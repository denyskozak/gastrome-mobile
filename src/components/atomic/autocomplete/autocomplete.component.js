import React, { useState } from 'react';
import PropsType from 'prop-types';
import { Text, View } from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import autoStyles, { AutocompleteColors } from './autocomplete.styles';
import { useTranslator } from '../../../hooks/useTranslator';

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
      colors={AutocompleteColors}
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

AutocompleteComponent.typeProps = {
  onChange: PropsType.func.isRequired,
  selectText: PropsType.string.isRequired,
  styles: PropsType.object,
};

export const Autocomplete = AutocompleteComponent;

