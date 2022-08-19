const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { User } = require("../models");
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  if (await User.isEmailTaken(req.body.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  User.create({ ...req.body })
    .then((user) => {
      res.status(httpStatus.CREATED).send(user);
    })
    .catch((err) =>
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Server Error" })
    );
});

module.exports = {
  register,
};
