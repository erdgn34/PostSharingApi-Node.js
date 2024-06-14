const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, default: 'active', enum: ['active', 'inactive'] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    views: { type: Number, default: 0 },
    file: { type: String },
});

module.exports = mongoose.model('Post', PostSchema);