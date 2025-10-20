export const commentsByRecipeId = {
    72: [
        {
            id: '72-1',
            userName: 'Emily Carter',
            avatar: require('./authorImages/1.jpeg'),
            rating: 5,
            date: '2024-03-18',
            message: 'These potatoes were incredible! The garlic butter soaks into every slice—my family asked for seconds.',
        },
        {
            id: '72-2',
            userName: 'Marcus Lee',
            avatar: require('./authorImages/2.jpg'),
            rating: 4,
            date: '2024-03-02',
            message: 'Loved the crispy edges. I added a squeeze of lemon at the end and it brightened the whole dish.',
        },
        {
            id: '72-3',
            userName: 'Sofia Ramirez',
            avatar: require('./authorImages/3.jpg'),
            rating: 5,
            date: '2024-02-25',
            message: 'Easy to follow and the flavors are perfect. Great side for grilled salmon!',
        },
    ],
    71: [
        {
            id: '71-1',
            userName: 'Noah Smith',
            avatar: require('./authorImages/4.jpg'),
            rating: 5,
            date: '2024-03-10',
            message: 'Super fresh and creamy. Burrata makes everything better—definitely adding this to my weekly menu.',
        },
        {
            id: '71-2',
            userName: 'Ava Johnson',
            avatar: require('./authorImages/1.jpeg'),
            rating: 4,
            date: '2024-03-01',
            message: 'Great balance of sweet and tangy. I toasted the pistachios for an extra crunch.',
        },
    ],
};

export const getCommentsByRecipeId = (recipeId) => {
    return commentsByRecipeId[recipeId] ?? [];
};
