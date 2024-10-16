import { Share } from 'react-native';
import { APP_STORE_URL } from '../constants/appURL';

export const handleSocialShare = async (text = '') => {
  try {
    await Share.share({
      message: `${text}\n\n Shared with Gastro & Me (${APP_STORE_URL})`,
    });
  } catch (error) {
    alert(error.message);
  }
};