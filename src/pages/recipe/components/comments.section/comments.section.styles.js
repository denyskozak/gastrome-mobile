import {StyleSheet} from 'react-native';

import {Colors} from '../../../../styles/colors';
import {Spaces} from '../../../../styles/spaces';
import {BorderRadius} from '../../../../styles/borderRadiuses';
import {getTextStyles} from '../../../../styles/common.styles';
import {fontEnum} from '../../../../styles/fonts';

export default StyleSheet.create({
    container: {
        marginTop: Spaces.xxlarge,
        paddingHorizontal: Spaces.small,
        paddingBottom: Spaces.xxlarge,
    },
    title: getTextStyles({
        fontSize: 22,
        fontFamily: fontEnum.PoppinsBold,
        marginBottom: Spaces.medium,
    }),
    form: {
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: BorderRadius.medium,
        padding: Spaces.medium,
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: Colors.white,
        gap: Spaces.small,
    },
    formAvatar: {
        width: Spaces.xxlarge,
        height: Spaces.xxlarge,
        borderRadius: Spaces.xxlarge / 2,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formAvatarText: getTextStyles({
        fontSize: 16,
        fontFamily: fontEnum.PoppinsBold,
        color: Colors.black,
    }),
    formInput: {
        flex: 1,
        minHeight: Spaces.xlarge * 2,
        paddingVertical: Spaces.small,
        paddingHorizontal: Spaces.small,
        borderRadius: BorderRadius.small,
        borderWidth: 1,
        borderColor: Colors.grey,
        textAlignVertical: 'top',
        ...getTextStyles({
            fontSize: 16,
        }),
    },
    formButton: {
        alignSelf: 'center',
    },
    list: {
        marginTop: Spaces.large,
        gap: Spaces.medium,
    },
    comment: {
        flexDirection: 'row',
        gap: Spaces.small,
    },
    avatar: {
        width: Spaces.xxlarge,
        height: Spaces.xxlarge,
        borderRadius: Spaces.xxlarge / 2,
    },
    avatarPlaceholder: {
        width: Spaces.xxlarge,
        height: Spaces.xxlarge,
        borderRadius: Spaces.xxlarge / 2,
        backgroundColor: Colors.black,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarPlaceholderText: getTextStyles({
        color: Colors.white,
        fontFamily: fontEnum.PoppinsBold,
    }),
    commentContent: {
        flex: 1,
        borderRadius: BorderRadius.medium,
        borderWidth: 1,
        borderColor: Colors.grey,
        padding: Spaces.medium,
        backgroundColor: Colors.white,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spaces.xsmall,
    },
    commentAuthor: getTextStyles({
        fontFamily: fontEnum.PoppinsSemiBold,
        fontSize: 16,
    }),
    commentDate: getTextStyles({
        fontSize: 12,
        color: Colors.grey,
    }),
    commentRating: {
        flexDirection: 'row',
        marginBottom: Spaces.xsmall,
    },
    ratingIcon: {
        marginRight: 2,
    },
    commentMessage: getTextStyles({
        fontSize: 16,
    }),
    empty: getTextStyles({
        fontSize: 16,
        marginTop: Spaces.large,
        color: Colors.grey,
    }),
});
