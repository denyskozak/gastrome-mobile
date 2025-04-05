import { StyleSheet } from 'react-native';
import {getPercentWidth, getTextStyles} from "../../../styles/common.styles";
import {Colors} from "../../../styles/colors";
import {Spaces} from "../../../styles/spaces";

const styles = StyleSheet.create({
    subscriptionsButton: { backgroundColor: Colors.black },
    subscriptionsButtonText: getTextStyles({
        color: Colors.white
    }),
});

export default styles;
