const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: String,
    content: String,
    mainImgUrl: String,
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
    }
}, {
    timestamps: true,
    versionKey: false
})


module.exports = mongoose.model("blog", BlogSchema);