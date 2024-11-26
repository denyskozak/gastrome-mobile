import {StyleSheet} from 'react-native';
import {getTextStyles} from '../../styles/common.styles';
import {Spaces} from '../../styles/spaces';
import {Colors} from "../../styles/colors";

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
        borderColor: Colors.white
    },
    title: getTextStyles({
        fontSize: 22,
        textAlign: 'center',
        color: Colors.white
    }),
    text: getTextStyles({
        marginTop: Spaces.small,
        fontSize: 16,
        textAlign: 'center',
        color: Colors.white

    }),
    buttonText: getTextStyles({
        fontSize: 18,
        color: Colors.white

    }),
});

export default styles;
