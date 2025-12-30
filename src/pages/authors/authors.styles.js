import {getPercentHeight, getPercentWidth, getTextStyles} from '../../styles/common.styles';
import {fontEnum} from '../../styles/fonts';
import {StyleSheet} from 'react-native';
import {Spaces} from '../../styles/spaces';
export const useStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        gap: Spaces.medium,
    },
    //Title
    titleContainer: {
        marginTop: Spaces.medium,
        alignItems: 'center',
    },

    title: getTextStyles({
        marginTop: Spaces.medium,
        alignItems: 'center',
        fontSize: 18,
        textAlign: 'center',
        paddingLeft: Spaces.medium,
        paddingRight: Spaces.medium,
    }),
    subscriptionsButton: {
        marginLeft: Spaces.medium,
        marginRight : Spaces.medium,
        backgroundColor: theme.colors.black,
        marginBottom: Spaces.medium,
    },
    subscriptionsButtonText: getTextStyles({
        color: theme.colors.white,
    }),

    recipes: getTextStyles({
        marginTop: Spaces.medium,
        alignItems: 'center',
        fontSize: 16,
        textAlign: 'center',
        paddingLeft: Spaces.medium,
        paddingRight: Spaces.medium,
    }),


    list: {
        gap: Spaces.xlarge,
    },
});
