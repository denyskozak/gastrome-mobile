import {AttentionAnimation} from "../../molecular/attansion-animation/attansion-animation.component";
import {Button} from "../../atomic/button/button.component";
import styles from "./subscription-button.styles";
import {Text} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import {Colors} from "../../../styles/colors";
import React from "react";

export const SubscriptionButton = (props) => {
    const { onPress, text = '' } = props;
    return (
        <AttentionAnimation intensive={3} delay={1500}>
            <Button style={styles.subscriptionsButton} onPress={() => {
                onPress?.()
            }}>
                <Text style={styles.subscriptionsButtonText}>
                    <Icon name="heart" size={24} color={Colors.white}/>
                    {' '}
                    {text}
                    {' '}
                    <Icon name="heart" size={24} color={Colors.white}/>
                </Text>
            </Button>
        </AttentionAnimation>
    )
}