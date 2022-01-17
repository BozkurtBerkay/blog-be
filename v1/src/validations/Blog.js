const Joi = require('joi');

const createValidation = Joi.object({
    title: Joi.string().required().min(2),
    content: Joi.string().required().min(3),
    categoryId: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required()
})

module.exports = {
    createValidation,
}