import {containerMarginTop, getPercentHeight, getPercentWidth, getTextStyles} from '../../../styles/common.styles';

import {StyleSheet} from 'react-native';
import {Spaces} from '../../../styles/spaces';
import {BorderRadius} from '../../../styles/borderRadiuses';
import {fontEnum} from '../../../styles/fonts';
import {getDevice} from '../../../utilities/getCurrentDevice';

export const useStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: getDevice() === 'iPad' ? '80%' : '100%',
        alignItems: 'center',
    },
    liner: {
        position: 'absolute',
        bottom: Spaces.xxlarge + Spaces.small,
        left: 0,
        zIndex: 3
    },
    video: {width: '100%', height: '100%', borderRadius:  getDevice() === 'iPad' ? BorderRadius.medium : 0},
    backButtonLeftContainer: {
        position: 'absolute',
        zIndex: 2,
        left: getDevice() === 'iPad' ? '10%' : '5%',
        bottom: Spaces.xxlarge,
        flexDirection: 'row',
        gap: Spaces.small,
    },
    backButtonRightContainer: {
        position: 'absolute',
        zIndex: 2,
        right: getDevice() === 'iPad' ? '10%' : '5%',
        bottom: Spaces.xxlarge,
        flexDirection: 'row',
        gap: Spaces.small,
    },
    backPause: {
        position: 'absolute',
        bottom: '50%',
    },
    backButton: {
        backgroundColor: theme.colors.white,
    },
    backButtonText: getTextStyles({
        fontSize: 18,
        color: theme.colors.black,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }),
    timerButton: {
        position: 'absolute',
        zIndex: 2,
        left: getDevice() === 'iPad' ? '10%' : '2%',
        bottom: Spaces.xxxlarge,
    },
    textContainer: {
        position: 'absolute',
        top: getDevice() === 'iPad' ? Spaces.xxlarge : Spaces.large,
        width: getDevice() === 'iPad' ? '80%' : '90%',
        borderWidth: 1,
        borderRadius: BorderRadius.small,
        padding: Spaces.small,
        borderColor: theme.colors.white,
        backgroundColor: theme.colors.backgroundColorLowOpacity
    },
    textContainerActive: {
        backgroundColor: theme.colors.backgroundColor
    },
    textSizeControl: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spaces.small,
        marginTop: Spaces.small,
    },
    textSizeLabel: getTextStyles({
        fontSize: 12,
        color: theme.colors.white,
    }),
    textSizeLabelLarge: getTextStyles({
        fontSize: 18,
        color: theme.colors.white,
    }),
    textSizeSlider: {
        flex: 1,
    },
    textBackIcon: {
        zIndex: 2,
        position: 'absolute',
        padding: Spaces.small,
        left: 0,
        top: Spaces.large,
    },
    textHideIcon: {
        zIndex: 2,
        position: 'absolute',
        padding: Spaces.small,
        right: 0,
        top: Spaces.large,
    },
    // authorContainer: {
    //     borderRadius: BorderRadius.small,
    //     backgroundColor: Colors.backgroundColorLowOpacity,
    //     padding: Spaces.small,
    //     position: 'absolute',
    //     bottom: Spaces.xxxlarge + Spaces.xxxlarge + Spaces.large,
    // },

    helpArrow: {
        position: 'absolute',
        opacity: 1,
        bottom: '20%',
        // left: '40%'
    },
    step: getTextStyles({
        fontSize: 18,
        color: theme.colors.white,
        textAlign: 'center',
        // maxHeight: Spaces.xxxlarge + Spaces.xxlarge,
    }),
    text: getTextStyles({
        marginTop: Spaces.small,
        fontSize: 18,
        color: theme.colors.white,
        textAlign: 'center',
        // maxHeight: Spaces.xxxlarge + Spaces.xxlarge,
    }),
    readText: getTextStyles({
        fontSize: 18,
        color: theme.colors.red,
    }),
});
