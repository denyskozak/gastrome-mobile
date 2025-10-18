export const sortByTitle = (a, b) => {
    if (a.title < b.title) {
        return -1;
    }
    if (a.title > b.title) {
        return 1;
    }
    return 0;
};

const sortByPriority = (a, b) => {
    if (a.priority < b.priority) {
        return -1;
    }
    if (a.priority > b.priority) {
        return 1;
    }
    return 0;
};

const sortByFree = (a, b) => (b.free ?? false) - (a.free ?? false);
export const sortRecipes = (items = [], sortType = 'asc') => {
    const list = [...items].sort(sortByPriority);
    switch (sortType) {
        case 'free':
            return list.sort(sortByFree);
        case 'asc':
            return list
        case 'desc':
            return list.reverse()
        default:
            return list
    }
}

export const sortRecipesByTitle = (items = [], sortType = 'asc') => {
    const list = [...items].sort(sortByTitle)
    return sortType === 'asc' ? list : list.reverse();
}

