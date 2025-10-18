import { authors as enAuthors} from './en/authors';
import { authors as ruAuthors} from './ru/authors';
import { authors as ukAuthors} from './uk/authors';

const translates = {
    en: enAuthors,
    ru: ruAuthors,
    uk: ukAuthors,
};

// Authors
export const getAuthor = (id, language = 'en') => {
    return translates[language].find(item => item.id === id);
};

export const getAuthors = (language = 'en') => {
    return translates[language];
};
