import { authors as enAuthors} from './en/authors';
import { authors as csAuthors} from './cs/authors';

const translates = {
    en: enAuthors,
    cs: csAuthors,
};

// Authors
export const getAuthor = (id, language = 'en') => {
    return translates[language].find(item => item.id === id);
};

export const getAuthors = (language = 'en') => {
    return translates[language];
};
