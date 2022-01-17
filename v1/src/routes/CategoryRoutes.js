const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate");
const schema = require("../validations/Category");
const CategoryController = require("../controllers/CategoryController");

router.route("/").get(CategoryController.list);
router.route("/").post(validate(schema.createValidation), CategoryController.create);

router.route('/:id').patch(validate(schema.createValidation), CategoryController.update);
router.route('/:id').delete(CategoryController.delete);

module.exports = router;
