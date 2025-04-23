import { StyleSheet } from 'react-native';
import { Spaces } from '../../../styles/spaces';
import { getTextStyles } from '../../../styles/common.styles';
import { Colors } from '../../../styles/colors';

const styles = StyleSheet.create({
  helpModalTitle: getTextStyles({
    marginTop: Spaces.medium,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.white
  }),

  helpModalButton: {
    marginTop: Spaces.medium,
    color: Colors.white,
    borderColor: Colors.white,
  },
});

export default styles;