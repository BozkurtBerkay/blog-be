const Joi = require('joi');

const createValidation = Joi.object({
    title: Joi.string().required().min(2),
    message: Joi.string().required().min(2),
})

module.exports = {
    createValidation,
}