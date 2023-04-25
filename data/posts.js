import { USERS } from "./Users";

export const POSTS = [
    {
        imageUrl: 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg',
        username: USERS[0].user,
        likes: 7870,
        caption: 'When life gives you lemons, you make lemonade. When company gives you product you make money.',
        profile_picture: USERS[0].image,
        comments: [
            {
                user: 'Ram',
                comment: 'Wow! amazing.',
            },
            {
                user: 'Shyam',
                comment: 'Wow! Thats amazing one.',
            },
        ],
    },
    {
        imageUrl: 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg',
        username: USERS[1].user,
        likes: 7870,
        caption: 'If you are working on something that you really care about, you dont have to be pushed. The vision pulls you.',
        profile_picture: USERS[1].image,
        comments: [
            {
                user: 'Mohan',
                comment: 'Wow! amazing.',
            },
            {
                user: 'Rohan',
                comment: 'Wow! Thats amazing one.',
            },
        ],
    },
]