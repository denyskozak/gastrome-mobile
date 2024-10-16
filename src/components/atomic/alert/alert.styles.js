import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/colors';
import { Spaces } from '../../../styles/spaces';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    padding: Spaces.large,
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: Spaces.small,
    marginBottom: Spaces.small,
    alignItems: 'center',
  }
});

export default styles;
