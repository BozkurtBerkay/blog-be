const _ = require("lodash");
const httpStatus = require("http-status");

const {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
} = require("../scripts/utils/userHelper");
const ApiError = require("../errors/ApiError");
const UserService = require("../services/UserService");
const logger = require("../scripts/logger/User");

class UserController {
  list = async (req, res, next) => {
    try {
      const users = await UserService.list();
      if (_.isEmpty(users))
        return next(new ApiError("Users are empty", httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).json(users);
    } catch (error) {
      next(new ApiError(error));
    }
  };

  create = async (req, res, next) => {
    try {
      const user = await UserService.read({ email: req.body.email });
      if (user)
        return next(
          new ApiError("User mail already available...", httpStatus.FOUND)
        );
      req.body.password = passwordToHash(req.body.password);
      const response = await UserService.create(req.body);
      res.status(httpStatus.CREATED).json(response);
    } catch (error) {
      next(new ApiError(error));
    }
  };

  login = async (req, res, next) => {
    try {
      req.body.password = passwordToHash(req.body.password);
      const user = await UserService.read(req.body);
      if (_.isEmpty(user))
        return next(new ApiError("User Not Found", httpStatus.NOT_FOUND));

      user.lastLoginDate = new Date().toISOString();
      await UserService.update({ _id: user._id }, user);
      const signedUser = {
        ...user.toObject(),
        tokens: {
          accessToken: generateAccessToken(user),
          refreshToken: generateRefreshToken(user),
        },
      };
      res.status(httpStatus.OK).json(signedUser);
    } catch (error) {
      next(new ApiError(error));
    }
  };

  update = async (req, res, next) => {
    try {
      const user = await UserService.update({ _id: req.params.id }, req.body);
      if (_.isEmpty(user))
        return next(new ApiError("User Not Found", httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).json(user);
    } catch (error) {
      next(new ApiError(error));
    }
  };

  delete = async (req, res, next) => {
    try {
      const user = await UserService.delete({ _id: req.user?._id });
      if (_.isEmpty(user))
        return next(new ApiError("User Not Found", httpStatus.NOT_FOUND));

      logger.log({
        level: "info",
        message: user,
      });
      res
        .status(httpStatus.OK)
        .json({ message: "User deleted successfully", user });
    } catch (error) {
      next(new ApiError(error));
    }
  };
}

module.exports = new UserController();
