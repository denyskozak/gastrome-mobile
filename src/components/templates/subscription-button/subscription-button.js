import {AttentionAnimation} from "../../molecular/attansion-animation/attansion-animation.component";
import {Button} from "../../atomic/button/button.component";
import { useStyles } from "./subscription-button.styles";
import {Text} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import React from "react";
import { useTheme } from "../../../hooks/useTheme";

export const SubscriptionButton = (props) => {
    const {onPress, text = ''} = props;
    const { theme } = useTheme();
    const styles = useStyles(theme);
    return (
        <Button style={styles.subscriptionsButton} onPress={() => {
            onPress?.()
        }}>
            <Text style={styles.subscriptionsButtonText}>
                <Icon name="heart" size={24} color={theme.colors.black}/>
                {' '}
                {text}
                {' '}
                <Icon name="heart" size={24} color={theme.colors.black}/>
            </Text>
        </Button>

    )
}
