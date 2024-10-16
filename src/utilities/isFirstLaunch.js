import AsyncStorage  from '@react-native-community/async-storage';

export async function isFirstLaunch(name) {
  try {
    const hasLaunched = await AsyncStorage.getItem(name);
    return !Boolean(hasLaunched);
  } catch (error) {
    return false;
  }
}