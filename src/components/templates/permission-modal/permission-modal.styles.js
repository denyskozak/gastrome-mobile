import { StyleSheet } from 'react-native';
import { Spaces } from '../../../styles/spaces';
import { getTextStyles } from '../../../styles/common.styles';
import { Colors } from '../../../styles/colors';

const styles = StyleSheet.create({
  helpModalTitle: getTextStyles({
    marginTop: Spaces.large,
    fontSize: 18,
    textAlign: 'center',
  }),
  helpModalButtonText: getTextStyles({
    fontSize: 20,
  }),
  helpModalButton: {
    marginTop: Spaces.medium,
  },
});

export default styles;