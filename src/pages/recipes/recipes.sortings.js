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
const sortByViewedFree = (viewedIds = []) => (a, b) => {
    const aViewed = Boolean(a.free) && viewedIds.includes(String(a.id));
    const bViewed = Boolean(b.free) && viewedIds.includes(String(b.id));
    if (aViewed !== bViewed) {
        return aViewed ? -1 : 1;
    }
    const freeCompare = sortByFree(a, b);
    if (freeCompare !== 0) {
        return freeCompare;
    }
    return sortByPriority(a, b);
};

export const sortRecipes = (items = [], sortType = 'asc', viewedIds = []) => {
    const list = [...items];
    switch (sortType) {
        case 'free-viewed':
            return list.sort(sortByViewedFree(viewedIds));
        case 'free':
            return list.sort((a, b) => {
                const freeCompare = sortByFree(a, b);
                if (freeCompare !== 0) {
                    return freeCompare;
                }
                return sortByPriority(a, b);
            });
        case 'asc':
            return list.sort(sortByPriority);
        case 'desc':
            return list.sort(sortByPriority).reverse();
        default:
            return list.sort(sortByPriority);
    }
}

export const sortRecipesByTitle = (items = [], sortType = 'asc') => {
    const list = [...items].sort(sortByTitle)
    return sortType === 'asc' ? list : list.reverse();
}
