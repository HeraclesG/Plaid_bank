const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService } = require("../services");

const register = catchAsync(async (req, res) => {
  res.status(httpStatus.CREATED).send({ user: "ok" });
});

module.exports = {
  register,
};
