const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    title: String,
    message: String,
}, {
    timestamps: true,
    versionKey: false
})


module.exports = mongoose.model("contact", ContactSchema);