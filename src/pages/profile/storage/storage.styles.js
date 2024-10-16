import { StyleSheet } from 'react-native';
import { getTextStyles } from '../../../styles/common.styles';
import { Spaces } from '../../../styles/spaces';
import { Colors } from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spaces.medium,
    marginTop: Spaces.large
  },
  title: getTextStyles({
    textAlign: 'center'
  }),
});

export default styles;
