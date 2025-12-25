import React from 'react';
import styles from './story-bar.styles';
import {View} from "react-native";

export const StoryProgressBar = ({ steps, activeIndex }) => {
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
