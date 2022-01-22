const Joi = require('joi');

const createValidation = Joi.object({
    blogId: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required()
})

module.exports = {
    createValidation,
}