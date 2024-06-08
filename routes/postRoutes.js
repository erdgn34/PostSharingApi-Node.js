const express = require('express');
const { createPost, updatePost, deletePost, getPosts } = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth('editor'), createPost);
router.put('/:id', auth('editor'), updatePost);
router.delete('/:id', auth('editor'), deletePost);
router.get('/', getPosts);

module.exports = router;
