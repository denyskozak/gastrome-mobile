import {translates as en} from './list/en';
import {translates as cs} from './list/cz';
import {getLocales} from 'expo-localization';

export const languages = {
    en: 'en',
    cz: 'cs',
};

// Set the key-value pairs for the different languages you want to support.
const translations = {
    en,
    cs
};

// Choose device default language
// const deviceLanguage = getLocales()[0].languageCode;
// const defaultLanguage = Object.values(languages).includes(deviceLanguage) ? deviceLanguage : 'en';
const defaultLanguage = 'en';

export {translations, defaultLanguage}