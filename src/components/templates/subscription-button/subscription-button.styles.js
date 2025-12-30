import { StyleSheet } from 'react-native';
import {getPercentWidth, getTextStyles} from "../../../styles/common.styles";
export const useStyles = (theme) => StyleSheet.create({
    subscriptionsButton: {  },
    subscriptionsButtonText: getTextStyles({
        color: theme.colors.black
    }),
});
