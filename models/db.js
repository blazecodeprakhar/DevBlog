/* In-Memory Data Store and Model Logic */

// Default Admin User
const ADMIN_USER = {
    name: "Prakhar Yadav",
    phone: "6390498069",
    password: "prakhar2",
    isAdmin: true
};

const users = [ADMIN_USER];

// Default Posts
let posts = [
    {
        id: 1,
        title: "Why I Started Blogging",
        content: "Blogging has always been a passion of mine. It allows me to share my thoughts, experiences, and knowledge with the world. In this journey, I hope to connect with like-minded individuals and learn from them as well.",
        author: "Prakhar Yadav",
        createdAt: new Date('2023-01-01'),
        views: 120,
        likes: 15,
        readingTime: 1,
        tags: ["personal", "blogging"]
    },
    {
        id: 2,
        title: "What I Learned Building This App",
        content: "Building this application with Node.js, Express, and EJS taught me a lot about server-side rendering and routing. Understanding how middleware works and how to manage state (even if temporary) was a great learning experience.",
        author: "Prakhar Yadav",
        createdAt: new Date('2023-01-05'),
        views: 85,
        likes: 10,
        readingTime: 2,
        tags: ["coding", "nodejs", "express"]
    },
    {
        id: 3,
        title: "Express + EJS Explained Simply",
        content: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. EJS is a simple templating language that lets you generate HTML markup with plain JavaScript.",
        author: "Prakhar Yadav",
        createdAt: new Date('2023-01-10'),
        views: 200,
        likes: 45,
        readingTime: 3,
        tags: ["tutorial", "webdev"]
    }
];

// Helper to generate unique IDs
const generateId = () => {
    return posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
};

module.exports = {
    // User Methods
    getUsers: () => users,
    findUser: (predicate) => users.find(predicate),
    addUser: (user) => users.push(user),

    // Post Methods
    getPosts: () => posts,
    getPostById: (id) => posts.find(p => p.id === id),
    addPost: (post) => {
        post.id = generateId();
        posts.push(post);
    },
    updatePost: (id, updatedData) => {
        const index = posts.findIndex(p => p.id === id);
        if (index !== -1) {
            posts[index] = { ...posts[index], ...updatedData };
            return true;
        }
        return false;
    },
    deletePost: (id) => {
        const initialLength = posts.length;
        posts = posts.filter(p => p.id !== id);
        return posts.length < initialLength;
    }
};
