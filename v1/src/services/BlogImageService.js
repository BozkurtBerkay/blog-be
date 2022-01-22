const BaseService = require("./BaseService");
const BlogImageModel = require("../models/BlogImage");

class BlogImageService extends BaseService {
  constructor() {
    super(BlogImageModel);
  }
  list() {
    return BlogImageModel.find().populate({
      path: "blogId",
    });
  }

  read(where) {
    return this.model?.findOne(where).populate({
      path: "blogId",
    })
}
}

module.exports = new BlogImageService();
