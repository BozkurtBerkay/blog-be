const Joi = require("joi");

const createValidation = Joi.object({
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]")).required().min(8),
});

const updateValidation = Joi.object({
  name: Joi.string().pattern(new RegExp("^[a-zA-Z]")).min(2),
});

const loginValidation = Joi.object({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]")).required().min(8),
  email: Joi.string().email().required().min(8),
});

module.exports = {
  createValidation,
  updateValidation,
  loginValidation,
};
