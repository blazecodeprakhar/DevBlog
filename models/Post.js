const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    // Using default _id
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    readingTime: {
        type: Number,
        default: 1
    },
    tags: {
        type: [String],
        default: []
    }
});

// Auto-increment simple ID (optional, but good for keeping URLs pretty /post/1 instead of /post/64b...)
// For simplicity in this migration, we might just generate random huge numbers or stick to Mongo _id.
// Let's stick to Mongo _id in the future, but to maintain compatibility with existing URLs (/post/:id),
// We will try to map `id` to a custom field. But standard Mongo practice is _id.
// The prompted code uses `id` (integer). I will handle this in Controller to use `_id` or a counter.
// Actually, let's switch to standard `_id` (ObjectId) for "Perfect" structure, 
// BUT this changes URLs. I'll stick to a random integer ID for now to preserve the easy logic, 
// or simply use the existing logic to generate IDs.

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
