import { StyleSheet } from 'react-native';
import { getTextStyles } from '../../styles/common.styles';
import { Spaces } from '../../styles/spaces';

const styles = StyleSheet.create({
  container: {
    marginTop: Spaces.medium,
    marginBottom: Spaces.medium,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: Spaces.small
  },
  button: {
    marginTop: Spaces.large,
  },
  title: getTextStyles({
    fontSize: 22,
    textAlign: 'center',
  }),
  text: getTextStyles({
    marginTop: Spaces.small,
    fontSize: 16,
    textAlign: 'center',
  }),
  buttonText: getTextStyles({
    fontSize: 18,
  }),
});

export default styles;
