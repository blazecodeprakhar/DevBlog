const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Public Routes
router.get('/', postController.getHomePage);
router.get('/search', postController.searchPosts);
router.get('/post/:id', postController.getPost);
router.get('/like/:id', postController.likePost); // Could be protected, but wasn't before

// Protected Routes
router.get('/my-posts', isAuthenticated, postController.getMyPosts);
router.get('/new', isAuthenticated, postController.getNewPostPage);
router.post('/create', isAuthenticated, postController.createPost);
router.get('/edit/:id', isAuthenticated, postController.getEditPostPage);
router.post('/edit/:id', isAuthenticated, postController.updatePost);
router.post('/delete/:id', isAuthenticated, postController.deletePost);

module.exports = router;
