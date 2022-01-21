const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const ApiError = require("../../errors/ApiError");

const addImages = (image) => {
  console.log(image);
  const extensions = path.extname(image.name);
  const fileName = `${uuid.v4()}${extensions}`;
  const folderPath = path.join(__dirname, "../../", "uploads/blog", fileName);
  image.mv(folderPath, (err) => {
    if (err) return new ApiError(err);
  });
  return fileName;
};

const deleteImages = (image) => {
  const folderPath = path.join(__dirname, "../../", "uploads/blog", image);
  fs.rm(folderPath, { force: true }, (err) => {
    if (err) return next(new ApiError(err));
  });
};

module.exports = {
  addImages,
  deleteImages,
};
