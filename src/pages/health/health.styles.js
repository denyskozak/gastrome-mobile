import {getPercentHeight, getPercentWidth, getTextStyles} from '../../styles/common.styles';
import {fontEnum} from '../../styles/fonts';
import {StyleSheet} from 'react-native';
import {Spaces} from '../../styles/spaces';
import {Colors} from '../../styles/colors';
import {BorderRadius as FontSize, BorderRadius} from "../../styles/borderRadiuses";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: Spaces.medium,
    },


    list: {
        gap: Spaces.xlarge,
    },
    item: {
      justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    image: {
        height: Spaces.xxxlarge * 2,
        width: Spaces.xxxlarge * 3,
        marginTop: Spaces.large,
        alignSelf: 'center',
        borderRadius: BorderRadius.small
    },
    text: getTextStyles({
        fontSize: FontSize.medium,
    }),
});

export default styles;
