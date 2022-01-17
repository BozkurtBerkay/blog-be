const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: String,
}, {
    timestamps: true,
    versionKey: false
})


module.exports = mongoose.model("category", CategorySchema);