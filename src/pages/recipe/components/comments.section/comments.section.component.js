import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {Image, Text, TextInput, View} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import {Button} from '../../../../components/atomic/button/button.component';
import {Spaces} from '../../../../styles/spaces';
import {Colors} from '../../../../styles/colors';

import styles from './comments.section.styles';

const getInitials = (name = '') => {
    if (!name) {
        return '';
    }

    return name
        .split(' ')
        .filter(Boolean)
        .map(part => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
};

const formatDate = (date) => {
    if (!date) {
        return '';
    }

    try {
        if (date instanceof Date) {
            return date.toISOString().split('T')[0];
        }

        if (typeof date === 'string' && date.includes('T')) {
            return date.split('T')[0];
        }

        return date;
    } catch (error) {
        return String(date);
    }
};

const renderRating = (rating) => {
    return new Array(5).fill(null).map((_, index) => (
        <Icon
            key={index}
            name={index < rating ? 'star' : 'star-outline'}
            size={Spaces.medium}
            color={Colors.primary}
            style={styles.ratingIcon}
        />
    ));
};

const CommentsSectionComponent = ({comments, translations}) => {
    const {title, placeholder, submit, empty, you, justNow} = translations;
    const [commentText, setCommentText] = useState('');
    const [localComments, setLocalComments] = useState(comments);

    useEffect(() => {
        setLocalComments(comments);
    }, [comments]);

    const hasComments = useMemo(() => localComments.length > 0, [localComments]);

    const handleSubmit = () => {
        const trimmed = commentText.trim();
        if (!trimmed) {
            return;
        }

        const newComment = {
            id: `local-${Date.now()}`,
            userName: you,
            avatar: null,
            rating: 5,
            date: justNow,
            message: trimmed,
        };

        setLocalComments([newComment, ...localComments]);
        setCommentText('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.form}>
                <View style={styles.formAvatar}>
                    <Text style={styles.formAvatarText}>{getInitials(you)}</Text>
                </View>
                <TextInput
                    multiline
                    value={commentText}
                    onChangeText={setCommentText}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.grey}
                    style={styles.formInput}
                />
                <Button
                    type="outlined"
                    size="s"
                    style={styles.formButton}
                    onPress={handleSubmit}
                >
                    {submit}
                </Button>
            </View>

            {hasComments ? (
                <View style={styles.list}>
                    {localComments.map(({id, userName, message, date, rating, avatar}) => (
                        <View key={id} style={styles.comment}>
                            {avatar ? (
                                <Image source={avatar} style={styles.avatar}/>
                            ) : (
                                <View style={styles.avatarPlaceholder}>
                                    <Text style={styles.avatarPlaceholderText}>{getInitials(userName)}</Text>
                                </View>
                            )}
                            <View style={styles.commentContent}>
                                <View style={styles.commentHeader}>
                                    <Text style={styles.commentAuthor}>{userName}</Text>
                                    <Text style={styles.commentDate}>{formatDate(date)}</Text>
                                </View>
                                <View style={styles.commentRating}>
                                    {renderRating(rating)}
                                </View>
                                <Text style={styles.commentMessage}>{message}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            ) : (
                <Text style={styles.empty}>{empty}</Text>
            )}
        </View>
    );
};

CommentsSectionComponent.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        userName: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        rating: PropTypes.number,
        avatar: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    })),
    translations: PropTypes.shape({
        title: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        submit: PropTypes.string.isRequired,
        empty: PropTypes.string.isRequired,
        you: PropTypes.string.isRequired,
        justNow: PropTypes.string.isRequired,
    }).isRequired,
};

CommentsSectionComponent.defaultProps = {
    comments: [],
};

export const CommentsSection = CommentsSectionComponent;
