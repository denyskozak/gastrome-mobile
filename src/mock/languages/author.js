import { authors as enAuthors} from './en/authors';
import { authors as ruAuthors} from './ru/authors';

const translates = {
    en: enAuthors,
    ru: ruAuthors,
};

// Authors
export const getAuthor = (id, language = 'en') => {
    return translates[language].find(item => item.id === id);
};

export const getAuthors = (language = 'en') => {
    return translates[language];
};
