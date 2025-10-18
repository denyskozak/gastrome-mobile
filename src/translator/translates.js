import {translates as en} from './list/en';
import {translates as ru} from './list/ru';
import {translates as uk} from './list/uk';
import {getLocales} from 'expo-localization';

export const languages = {
    en: 'en',
    ru: 'ru',
    uk: 'uk',
};

// Set the key-value pairs for the different languages you want to support.
const translations = {
    en,
    uk,
    ru
};

// Choose device default language
// const deviceLanguage = getLocales()[0].languageCode;
// const defaultLanguage = Object.values(languages).includes(deviceLanguage) ? deviceLanguage : 'en';
const defaultLanguage = 'en';

export {translations, defaultLanguage}