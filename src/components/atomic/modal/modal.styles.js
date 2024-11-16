import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/colors';
import { Spaces } from '../../../styles/spaces';
import {BorderRadius} from "../../../styles/borderRadiuses";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    padding: Spaces.large,
    justifyContent: 'center',
    borderRadius: BorderRadius.medium,
    borderWidth: 1,

    borderColor: Colors.white,
    marginTop: Spaces.small,
    marginBottom: Spaces.small,
    alignItems: 'center',
  }
});

export default styles;
