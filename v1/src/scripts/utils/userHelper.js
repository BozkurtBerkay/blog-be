const _ = require('lodash');
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');

const passwordToHash = (password) => {
    return crypto.HmacSHA256(password, crypto.HmacSHA1(password, process.env.HASH_KEY)).toString();
}

const generateAccessToken = (user) => {
    return jwt.sign({ _id: user._id, ...user }, process.env.ACCESS_TOKEN, {
        expiresIn: "1d"
    })
}
const generateRefreshToken = (user) => {
    return jwt.sign({ _id: user._id, ...user }, process.env.REFRESH_TOKEN)
}

module.exports = {
    passwordToHash,
    generateAccessToken,
    generateRefreshToken,
}