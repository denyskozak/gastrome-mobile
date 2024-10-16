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

export const isIPhoneUpper14 = () => {
  const { modelName } = Device;
  if (getDevice() === 'iPhone' && typeof modelName === 'string') {
    const uppers = [
      'iPhone 14 Pro',
      'iPhone 15',
    ];

    return uppers.some(model => modelName.includes(model));
  }

  return false;
};
