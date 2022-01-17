const httpStatus = require("http-status");

module.exports = (err, req, res, next) => {
    res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).json({ error: { message: err.message } });
}