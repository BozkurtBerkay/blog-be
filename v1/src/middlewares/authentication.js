const httpStatus = require("http-status");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (_.isEmpty(token)) return res.status(httpStatus.UNAUTHORIZED).json({ error: "Unauthorized" });

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(httpStatus.FORBIDDEN).json({ error: "Invalid Token" })
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;