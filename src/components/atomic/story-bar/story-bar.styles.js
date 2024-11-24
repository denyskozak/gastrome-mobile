import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/colors';
import { Spaces } from '../../../styles/spaces';
import {getPercentWidth} from "../../../styles/common.styles";

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Spaces.xsmall,
    marginVertical: 10,
  },
  segment: {
    flex: 1,
    height: '100%',
    marginHorizontal: 2, // Adds a gap between segments
    borderRadius: 2.5, // Round edges for the segments
    transition: 'background-color 0.3s ease', // Smooth transition
  },
  activeSegment: {
    backgroundColor: Colors.white,
  },
  inactiveSegment: {
    backgroundColor: Colors.black,
  },
});

export default styles;
