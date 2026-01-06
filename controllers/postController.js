/* Post Controller - MongoDB Version */
const Post = require('../models/Post');
const { calculateReadingTime } = require('../utils/helpers');

// Helper to handle numeric IDs if we stick to them, OR switch to _id.
// For "Perfection", we should use _id (ObjectId).
// I will update the Views to use `post._id`!

// Home Page
exports.getHomePage = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.render('index', { posts, pageTitle: 'Latest Posts' });
    } catch (error) {
        console.error(error);
        res.render('index', { posts: [], pageTitle: 'Error Loading Posts' });
    }
};

// Search
exports.searchPosts = async (req, res) => {
    try {
        const query = req.query.q || '';
        const regex = new RegExp(query, 'i'); // Case insensitive regex

        const posts = await Post.find({
            $or: [
                { title: regex },
                { content: regex },
                { author: regex },
                { tags: regex }
            ]
        });

        res.render('index', { posts, pageTitle: `Search Results for "${query}"` });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
};

// My Posts
exports.getMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.session.user.name });
        res.render('index', { posts, pageTitle: 'My Posts' });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
};

// Single Post
exports.getPost = async (req, res) => {
    try {
        const id = req.params.id; // Could be ObjectId string
        let post;

        // Check if valid ObjectId
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            post = await Post.findById(id);
        } else {
            // Fallback for legacy numeric IDs (if migrated visually)
            post = await Post.findOne({ id: parseInt(id) });
        }

        if (!post) return res.status(404).render('404');

        post.views += 1;
        await post.save();

        res.render('post', { post });
    } catch (error) {
        console.error(error);
        res.status(404).render('404');
    }
};

// Like Post
exports.likePost = async (req, res) => {
    try {
        const id = req.params.id;
        let post;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            post = await Post.findById(id);
        } else {
            post = await Post.findOne({ id: parseInt(id) });
        }

        if (post) {
            post.likes += 1;
            await post.save();
            const referer = req.get('Referer');
            if (referer && referer.includes('/post/')) {
                return res.redirect(`/post/${post._id || post.id}`);
            }
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
};

// New Post Form
exports.getNewPostPage = (req, res) => {
    res.render('new');
};

// Create Post
exports.createPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        if (title && content) {
            // Check for a numeric ID strategy?
            // Let's just use MongoDB _id. It is safer.
            // But we need to update IDs in views/routes to use _id strings.

            await Post.create({
                // id: Date.now(), // Temporary numeric ID if needed
                title,
                content,
                author: req.session.user.name,
                views: 0,
                likes: 0,
                readingTime: calculateReadingTime(content),
                tags: tags ? tags.split(',').map(t => t.trim()) : []
            });
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/new');
    }
};

// Edit Post Form
exports.getEditPostPage = async (req, res) => {
    try {
        const id = req.params.id;
        let post;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            post = await Post.findById(id);
        } else {
            post = await Post.findOne({ id: parseInt(id) });
        }

        if (!post) return res.status(404).render('404');

        if (post.author !== req.session.user.name && !req.session.user.isAdmin) {
            return res.status(403).send("Unauthorized");
        }

        res.render('edit', { post });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
};

// Update Post
exports.updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, content, tags } = req.body;

        let post;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            post = await Post.findById(id);
        } else {
            post = await Post.findOne({ id: parseInt(id) });
        }

        if (post) {
            if (post.author !== req.session.user.name && !req.session.user.isAdmin) {
                return res.status(403).send("Unauthorized");
            }

            post.title = title;
            post.content = content;
            post.readingTime = calculateReadingTime(content);
            post.tags = tags ? tags.split(',').map(t => t.trim()) : [];
            await post.save();
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
};

// Delete Post
exports.deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        let post;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            post = await Post.findById(id);
        } else {
            post = await Post.findOne({ id: parseInt(id) });
        }

        if (post) {
            if (post.author !== req.session.user.name && !req.session.user.isAdmin) {
                return res.status(403).send("Unauthorized");
            }
            await post.deleteOne(); // or remove()
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
};
