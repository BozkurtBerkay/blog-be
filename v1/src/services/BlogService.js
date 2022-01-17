const BaseService = require("./BaseService");
const BlogModel = require("../models/Blog");

class BlogService extends BaseService {
  constructor() {
    super(BlogModel);
  }
  list() {
    return BlogModel.find().populate({
      path: "categoryId",
      select: "name"
    });
  }
}

module.exports = new BlogService();
