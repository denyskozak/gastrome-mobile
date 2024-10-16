import { StyleSheet } from 'react-native';
import { getTextStyles } from '../../../styles/common.styles';
import { Colors } from '../../../styles/colors';

const text = getTextStyles({
  fontSize: 24,
  fontWeight: '400',
  textDecorationLine: 'none',
});

const styles = StyleSheet.create({
  selectText: {
    ...text,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: Colors.black,
    borderRadius: 30,
    padding: 12,
  },
  selectContainer: {
    justifyContent: 'center',
  },
  text: text,
});

export const AutocompleteColors = {
  primary: Colors.black,
  success: Colors.black,
  subItemBackground: Colors.backgroundColor,
  itemBackground: Colors.backgroundColor,
};

export default styles;
