const _ = require("lodash");
const httpStatus = require("http-status");

const ApiError = require("../errors/ApiError");
const BlogService = require("../services/BlogService");
const { addImages, deleteImages } = require("../scripts/utils/blogHelper");
const logger = require("../scripts/logger/Blog");

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

  find = async (req, res, next) => {
    try {
      const blogs = await BlogService.read({ _id: req.params.id });
      if (_.isEmpty(blogs))
        return next(new ApiError("Blogs are empty", httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).json(blogs);
    } catch (error) {
      next(new ApiError(error));
    }
  };

  create = async (req, res, next) => {
    try {
      if (_.isEmpty(req.files?.image))
        return next(new ApiError("Image required", httpStatus.BAD_REQUEST));

      const fileName = addImages(req.files?.image);
      req.body.mainImgUrl = fileName;
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
      if (req.files?.image != undefined) {
        const blog = await BlogService.read({ _id: req.params.id });
        deleteImages(blog.mainImgUrl);
        const fileName = addImages(req.files?.image);
        req.body.mainImgUrl = fileName;
        const updateBlog = await BlogService.update(
          { _id: req.params.id },
          req.body
        );
        if (_.isEmpty(updateBlog))
          return next(new ApiError("Blog Not Found", httpStatus.NOT_FOUND));
        return res.status(httpStatus.OK).json(updateBlog);
      }
      const updateBlog = await BlogService.update(
        { _id: req.params.id },
        req.body
      );
      if (_.isEmpty(updateBlog))
        return next(new ApiError("Blog Not Found", httpStatus.NOT_FOUND));
      return res.status(httpStatus.OK).json(updateBlog);
    } catch (error) {
      next(new ApiError(error));
    }
  };

  delete = async (req, res, next) => {
    try {
      const blog = await BlogService.read({ _id: req.params.id });
      deleteImages(blog.mainImgUrl);

      const deleteBlog = await BlogService.delete({ _id: req.params.id });
      if (_.isEmpty(deleteBlog))
        return next(new ApiError("Blog Not Found", httpStatus.NOT_FOUND));

      logger.log({
        level: "info",
        message: deleteBlog,
      });
      res
        .status(httpStatus.OK)
        .json({ message: "Blog deleted successfully", deleteBlog });
    } catch (error) {
      next(new ApiError(error));
    }
  };
}

module.exports = new BlogController();
