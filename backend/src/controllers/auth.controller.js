const httpStatus = require("http-status");
const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");

const { ptToken } = config.jwt;

const register = catchAsync(async (req, res) => {
  if (await User.isUserNameTaken(req.body.userName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Username already taken");
  }

  User.create({ ...req.body })
    .then((user) => {
      res.status(httpStatus.CREATED).send(user);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "Server Error" });
    });
});

const getUserEmail = catchAsync(async (req, res) => {
  const { userName } = req.body;
  let currentUser = await User.findOne({ userName });
  if (!currentUser) {
    res.status(400).send({ message: "User is not registered." });
    return;
  }
  res.send({ email: currentUser.email, accountId: currentUser.accountId });
});

const login = catchAsync(async (req, res) => {
  const { userName, pin } = req.body;
  let currentUser = await User.findOne({ userName });
  if (!currentUser) {
    res.status(400).send({ message: "User is not registered." });
    return;
  }

  if (currentUser.pin != pin) {
    res.status(400).send({ message: "Pin code is wrong." });
    return;
  }

  // we don't need complex login logic in this MVP version. because we are using only prime trust apis now.
  res.send({ currentUser });
  // await axios({
  //   method: "POST",
  //   params: {
  //     email: currentUser.email,
  //     password: req.body.password,
  //   },
  //   url: "https://sandbox.primetrust.com/auth/jwts",
  //   // url: "https://sandbox.primetrust.com/v2/users",
  // })
  //   .then((response) => {
  //     console.log("response", response.data);
  //     res.send({ token: response.data.token, user: currentUser });
  //   })
  //   .catch((err) => {
  //     console.log("error", err?.response?.data?.errors[0]?.title);
  //     res.status(400).send({ message: "Input correct Prime Trust credentials" });
  //   });
});

module.exports = {
  register,
  login,
  getUserEmail,
};
