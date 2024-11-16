import { StyleSheet } from 'react-native';
import {getTextStyles} from "../../../styles/common.styles";
import {Colors} from "../../../styles/colors";

const styles = StyleSheet.create({
    subscriptionsButton: { backgroundColor: Colors.black },
    subscriptionsButtonText: getTextStyles({
        color: Colors.white
    }),
});

export default styles;
