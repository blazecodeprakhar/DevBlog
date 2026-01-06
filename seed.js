const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Post = require('./models/Post');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        // Drop collection to remove old indexes (like id_1)
        try {
            await mongoose.connection.collection('posts').drop();
        } catch (e) {
            // Include code to ignore error if collection doesn't exist
            if (e.code !== 26) console.log(e);
        }

        // user
        const adminUser = await User.create({
            name: "Prakhar Yadav",
            phone: "6390498069",
            password: "prakhar2", // This will be hashed by the pre-save hook
            isAdmin: true
        });

        // posts
        const posts = [
            {
                title: "Why I Started Blogging",
                content: "Blogging has always been a passion of mine. It allows me to share my thoughts, experiences, and knowledge with the world. In this journey, I hope to connect with like-minded individuals and learn from them as well.",
                author: "Prakhar Yadav",
                views: 120,
                likes: 15,
                readingTime: 1,
                tags: ["personal", "blogging"]
            },
            {
                title: "What I Learned Building This App",
                content: "Building this application with Node.js, Express, and EJS taught me a lot about server-side rendering and routing. Understanding how middleware works and how to manage state (even if temporary) was a great learning experience.",
                author: "Prakhar Yadav",
                views: 85,
                likes: 10,
                readingTime: 2,
                tags: ["coding", "nodejs", "express"]
            },
            {
                title: "Express + EJS Explained Simply",
                content: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. EJS is a simple templating language that lets you generate HTML markup with plain JavaScript.",
                author: "Prakhar Yadav",
                views: 200,
                likes: 45,
                readingTime: 3,
                tags: ["tutorial", "webdev"]
            }
        ];

        await Post.insertMany(posts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
