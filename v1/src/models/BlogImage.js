const mongoose = require('mongoose');

const BlogImageSchema = mongoose.Schema({
    path: String,
    blogId: {
        type: mongoose.Types.ObjectId,
        ref: 'blog',
    }
}, {
    timestamps: true,
    versionKey: false
})


module.exports = mongoose.model("blogImage", BlogImageSchema);