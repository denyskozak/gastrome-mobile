import {translates as en} from './list/en';
import {translates as ru} from './list/ru';
import {getLocales} from 'expo-localization';

export const languages = {
    en: 'en',
    ru: 'ru',
};

// Set the key-value pairs for the different languages you want to support.
const translations = {
    en,
    ru
};

// Choose device default language
const deviceLanguage = getLocales()[0].languageCode;
const defaultLanguage = Object.values(languages).includes(deviceLanguage) ? deviceLanguage : 'en';
// const defaultLanguage = 'en';

export {translations, defaultLanguage}