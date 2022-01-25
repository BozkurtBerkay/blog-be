const _ = require("lodash");
const httpStatus = require("http-status");

const ApiError = require("../errors/ApiError");
const ContactService = require("../services/ContactService");
const logger = require("../scripts/logger/Contact");

class ContactController {
  list = async (req, res, next) => {
    try {
      const contacts = await ContactService.list();
      if (_.isEmpty(contacts))
        return next(new ApiError("Contacts are empty", httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).json(contacts);
    } catch (error) {
      next(new ApiError(error));
    }
  };

  create = async (req, res, next) => {
    try {
      const contact = await ContactService.create(req.body);
      if (_.isEmpty(contact))
        return next(new ApiError("Contact Not Found", httpStatus.NOT_FOUND));
      res.status(httpStatus.CREATED).json(contact);
    } catch (error) {
      next(new ApiError(error));
    }
  };

  update = async (req, res, next) => {
    try {
      const contact = await ContactService.update({ _id: req.params.id }, req.body);
      if (_.isEmpty(contact))
        return next(new ApiError("Contact Not Found", httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).json(contact);
    } catch (error) {
      next(new ApiError(error));
    }
  };

  delete = async (req, res, next) => {
    try {
      const contact = await ContactService.delete({ _id: req.params.id });
      logger.log({
        level: 'info',
        message: contact,
      })
      if (_.isEmpty(contact))
        return next(new ApiError("Contact Not Found", httpStatus.NOT_FOUND));
      res
        .status(httpStatus.OK)
        .json({ message: "Contact deleted successfully", contact });
    } catch (error) {
      next(new ApiError(error));
    }
  };
}

module.exports = new ContactController();
