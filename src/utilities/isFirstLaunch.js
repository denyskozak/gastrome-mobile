import AsyncStorage  from '@react-native-async-storage/async-storage';

export async function isFirstLaunch(name) {
  try {
    const hasLaunched = await AsyncStorage.getItem(name);
    return !Boolean(hasLaunched);
  } catch (error) {
    return false;
  }
}