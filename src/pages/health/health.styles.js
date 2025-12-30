import {getPercentHeight, getPercentWidth, getTextStyles} from '../../styles/common.styles';
import {fontEnum} from '../../styles/fonts';
import {StyleSheet} from 'react-native';
import {Spaces} from '../../styles/spaces';
import {BorderRadius as FontSize, BorderRadius} from "../../styles/borderRadiuses";
import {getImageSize} from "../../utilities/getImageSize";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: Spaces.medium,
    },


    list: {
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    image: {
        ...getImageSize(),
        marginTop: Spaces.large,
        borderRadius: BorderRadius.small
    },
    text: getTextStyles({
        fontSize: FontSize.medium,
    }),
});

export default styles;
