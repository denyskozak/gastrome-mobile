import {StyleSheet} from "react-native";
import {getTextStyles} from "../../styles/common.styles";
import {Colors} from "../../styles/colors";
import {Spaces} from "../../styles/spaces";

export const getStyles = (tabBarHeight) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    videoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    poster: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    bufferingOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    errorOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 24,
    },
    errorText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    overlayGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 320,
    },
    metaContainer: {
        flex: 1,
        marginRight: 16,
    },
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    metaText: {
        flexShrink: 1,
    },
    authorName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    description: {
        color: '#fff',
        fontSize: 15,
        marginBottom: 6,
    },
    metaButtonWrapper: {
        marginTop: 12,
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    metaButton: {
        alignSelf: 'flex-start',
        borderWidth:1,
        borderColor: Colors.black
    },
    metaButtonText: getTextStyles({
        fontSize: 20,
        color: Colors.black,
        fontWeight: '600',
    }),
    tags: {
        color: '#d1d1d1',
        fontSize: 13,
    },
    actionsContainer: {
        width: Spaces.xxlarge,
        alignItems: 'center',
        marginBottom: Spaces.medium
    },
    actionButton: {
        alignItems: 'center',
        marginTop: 18,
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(60,60,67,0.45)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    musicOffSlash: {
        position: 'absolute',
        width: 3,
        height: 36,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        transform: [{ rotate: '45deg' }],
    },
    actionLabel: {
        color: '#fff',
        marginTop: 4,
        fontSize: 12,
    },
    progressContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: tabBarHeight,
        height: Spaces.xsmall + Spaces.xxsmall,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    progressLine: {
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
    heart: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -36,
        marginTop: -36,
    },
    feedbackContainer: {
        position: 'absolute',
        top: '20%',
        alignSelf: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    feedbackText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
});
