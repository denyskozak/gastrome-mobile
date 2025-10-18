import analytics from '@react-native-firebase/analytics';

export const logEvent = async (title, params) => {
    await analytics().logEvent(title, params)
}