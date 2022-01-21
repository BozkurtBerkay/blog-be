const express = require("express");
const router = express.Router();

const authentication = require('../middlewares/authentication');
const validate = require("../middlewares/validate");
const schema = require("../validations/User");
const UserController = require("../controllers/UserController");

router.route("/").get(authentication, UserController.list);
router.route('/').delete(authentication, UserController.delete);
router.route("/register").post(validate(schema.createValidation), UserController.create);
router.route('/login').post(validate(schema.loginValidation), UserController.login)

router.route('/:id').patch(authentication, validate(schema.createValidation), UserController.update);

module.exports = router;
