const { connectMongoDB } = require('./db');

module.exports = () => {
    connectMongoDB();
}