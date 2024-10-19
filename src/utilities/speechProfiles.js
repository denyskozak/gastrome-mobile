import * as Speech from "expo-speech";

const enabledProfiles = {
    'en': [
        'Karen', 'Catherine', 'Daniel', 'Arthur', 'Moira', 'Rishi', 'Nicky', 'Aaron', 'Samantha', 'Tessa'
    ],
    cs: [
        'Zuzana'
    ]
};

export const preferableProfileByLanguages = {
    en: 'Samantha',
    cs: 'Zuzana'
}

export const isProfileEnabled = (profile, language) => enabledProfiles[language].includes(profile.name);

export const getSpeechProfiles = async (language = 'en') => {
    const profiles = await Speech.getAvailableVoicesAsync();

    return profiles.filter(item => item.language.includes(`${language}-`) && isProfileEnabled(item, language));
}