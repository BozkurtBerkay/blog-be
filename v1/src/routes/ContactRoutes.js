const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate");
const schema = require("../validations/Contact");
const ContactController = require("../controllers/ContactController");

router.route("/").get(ContactController.list);
router.route("/").post(validate(schema.createValidation), ContactController.create);

router.route('/:id').patch(validate(schema.createValidation), ContactController.update);
router.route('/:id').delete(ContactController.delete);

module.exports = router;
