import React from 'react';
import {View} from "react-native";
import { useTheme } from '../../../hooks/useTheme';
import { useStyles } from './story-bar.styles';

export const StoryProgressBar = ({ steps, activeIndex }) => {
    const { theme } = useTheme();
    const styles = useStyles(theme);
    return (
        <View style={styles.container}>
            {Array.from({ length: steps }).map((_, index) => (
                <View
                    key={index + activeIndex}
                    style={{
                        ...styles.segment,
                        ...(index === activeIndex
                            ? styles.activeSegment
                            : styles.inactiveSegment),
                    }}
                ></View>
            ))}
        </View>
    );
};
