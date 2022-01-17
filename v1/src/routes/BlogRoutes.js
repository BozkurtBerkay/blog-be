const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate");
const schema = require("../validations/Blog");
const BlogController = require("../controllers/BlogController");

router.route("/").get(BlogController.list);
router.route("/").post(validate(schema.createValidation), BlogController.create);

router.route('/:id').patch(validate(schema.createValidation), BlogController.update);
router.route('/:id').delete(BlogController.delete);

module.exports = router;
