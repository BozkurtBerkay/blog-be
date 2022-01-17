const _ = require("lodash");
const httpStatus = require("http-status");

const ApiError = require("../errors/ApiError");
const BlogService = require("../services/BlogService");

class BlogController {
  list = async (req, res, next) => {
    try {
      const blogs = await BlogService.list();
      if (_.isEmpty(blogs))
        return next(new ApiError("Blogs are empty", httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).json(blogs);
    } catch (error) {
      next(new ApiError(error));
    }
  };

  create = async (req, res, next) => {
    try {
      const blog = await BlogService.create(req.body);
      if (_.isEmpty(blog))
        return next(new ApiError("Blog Not Found", httpStatus.NOT_FOUND));
      res.status(httpStatus.CREATED).json(blog);
    } catch (error) {
      next(new ApiError(error));
    }
  };

  update = async (req, res, next) => {
    try {
      const blog = await BlogService.update({ _id: req.params.id }, req.body);
      if (_.isEmpty(blog))
        return next(new ApiError("Blog Not Found", httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).json(blog);
    } catch (error) {
      next(new ApiError(error));
    }
  };

  delete = async (req, res, next) => {
    try {
      const blog = await BlogService.delete({ _id: req.params.id });
      if (_.isEmpty(blog))
        return next(new ApiError("Blog Not Found", httpStatus.NOT_FOUND));
      res
        .status(httpStatus.OK)
        .json({ message: "Blog deleted successfully", blog });
    } catch (error) {
      next(new ApiError(error));
    }
  };
}

module.exports = new BlogController();
