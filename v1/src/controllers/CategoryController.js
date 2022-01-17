const _ = require("lodash");
const httpStatus = require("http-status");

const ApiError = require("../errors/ApiError");
const CategoryService = require("../services/CategoryService");

class CategoryController {
  list = async (req, res, next) => {
    try {
      const categories = await CategoryService.list();
      if (_.isEmpty(categories))
        return next(new ApiError("Categories are empty", httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).json(categories);
    } catch (error) {
      next(new ApiError(error));
    }
  };

  create = async (req, res, next) => {
    try {
      const category = await CategoryService.create(req.body);
      if (_.isEmpty(category))
        return next(new ApiError("Categories are empty", httpStatus.NOT_FOUND));
      res.status(httpStatus.CREATED).json(category);
    } catch (error) {
      next(new ApiError(error));
    }
  };

  update = async (req, res, next) => {
    try {
      const category = await CategoryService.update(
        { _id: req.params.id },
        req.body
      );
      if (_.isEmpty(category))
        return next(new ApiError("Categories are empty", httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).json(category);
    } catch (error) {
      next(new ApiError(error));
    }
  };

  delete = async (req, res, next) => {
    try {
      const category = await CategoryService.delete({ _id: req.params.id });
      if (_.isEmpty(category))
        return next(new ApiError("Categories are empty", httpStatus.NOT_FOUND));
      res
        .status(httpStatus.OK)
        .json({ message: "Category deleted successfully", category });
    } catch (error) {
      next(new ApiError(error));
    }
  };
}

module.exports = new CategoryController();
