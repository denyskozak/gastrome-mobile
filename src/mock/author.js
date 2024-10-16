import Author1 from './authorImages/1.jpeg';

const items = [
  {
    id: 1,
    name: 'Stanislav Drobny',
    description: 'Cooking Instructor in Gastro & Me',
    image: Author1
  }
]

export const getAuthor = (id) => {
  return items.find(item => item.id = id);
};

export const getAuthors = () => {
  return items;
};
