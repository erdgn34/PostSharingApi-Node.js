const Post = require('../models/post');

const createPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        const post = new Post({ title, content, author: req.user.id });
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, status } = req.body;
    try {
        let post = await Post.findById(id);
        if (!post || post.author.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        post.title = title;
        post.content = content;
        post.status = status;
        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post || post.author.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        await post.deleteOne({_id:id});
        res.json({ msg: 'Post removed' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' ,error:err.message});
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ status: 'active' }).populate('author', ['name']);
        res.json(posts);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { createPost, updatePost, deletePost, getPosts };
