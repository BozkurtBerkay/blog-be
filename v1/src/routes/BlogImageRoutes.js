const express = require("express");
const router = express.Router();

const authentication = require('../middlewares/authentication')
const validate = require("../middlewares/validate");
const schema = require("../validations/BlogImage");
const BlogImageController = require("../controllers/BlogImageController");

router.route("/").get(authentication, BlogImageController.list);
router.route("/").post(authentication, validate(schema.createValidation), BlogImageController.create);

router.route('/:id').patch(authentication, validate(schema.createValidation), BlogImageController.update);
router.route('/:id').delete(authentication, BlogImageController.delete);
router.route('/:id').get(authentication, BlogImageController.find);

module.exports = router;
