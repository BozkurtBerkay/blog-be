const express = require("express");
const router = express.Router();

const authentication = require('../middlewares/authentication')
const validate = require("../middlewares/validate");
const schema = require("../validations/Blog");
const BlogController = require("../controllers/BlogController");

router.route("/").get(authentication, BlogController.list);
router.route("/").post(authentication, validate(schema.createValidation), BlogController.create);

router.route('/:id').patch(authentication, validate(schema.createValidation), BlogController.update);
router.route('/:id').delete(authentication, BlogController.delete);
router.route('/:id').get(authentication, BlogController.find);

module.exports = router;
