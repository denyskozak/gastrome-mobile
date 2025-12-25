import styles from './author-preview.styles';
import {Image, Text, View} from "react-native";
import React from "react";
import {Animated} from "../../atomic/animated/animated.component";
import {PinwheelIn} from "react-native-reanimated";

const AuthorPreviewComponent = (props) => {
    const {imageSource, name} = props;

    return (
        <View>
            <Animated name="PinwheelIn">
                <Image source={imageSource} style={styles.image}/>
            </Animated>
            <Text style={styles.name}>{name}</Text>
        </View>
    );
}

export const AuthorPreview = AuthorPreviewComponent;
