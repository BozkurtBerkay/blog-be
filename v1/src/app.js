const express = require("express");
const httpStatus = require("http-status");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const path = require('path');


const config = require("./config");
const loaders = require("./loaders");
const errorHandler = require("./middlewares/errorHandler");
const { CategoryRoutes, BlogRoutes, ContactRoutes, UserRoutes, BlogImageRoutes } = require("./routes");

config();
loaders();

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "./", "uploads")))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileUpload());

app.use("/user", UserRoutes);
app.use("/category", CategoryRoutes);
app.use("/blog", BlogRoutes);
app.use("/contact", ContactRoutes);
app.use("/blog-image", BlogImageRoutes);

app.use((req, res, next) => {
  const err = new Error("Bad Request");
  err.status = httpStatus.BAD_REQUEST;
  next(err);
});
app.use(errorHandler);

app.listen(process.env.APP_PORT, () => {
  console.log(`Sunucu ${process.env.APP_PORT} portunda ayakta...`);
});
