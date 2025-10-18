import { Dimensions, Platform, SafeAreaView } from 'react-native'
import * as Device from 'expo-device';

export const getDevice =  () => {
  if (Platform.OS === 'ios') {
    return Platform.isPad ? 'iPad' : 'iPhone'
  }
  return 'android'
}


export const isIPhoneLowerX =  () => {
  const { modelName } = Device;
  if (getDevice() === 'iPhone' && typeof modelName === 'string') {
    const lowers = [
      'iPhone SE',
      'iPhone 6',
      'iPhone 6',
      'iPhone 7',
      'iPhone 8',
    ];

    return lowers.some(model => modelName.includes(model));
  }
  
  return false;
}
