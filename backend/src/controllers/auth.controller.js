const httpStatus = require("http-status");
const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");

const register = catchAsync(async (req, res) => {
  if (await User.isUserNameTaken(req.body.userName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Username already taken");
  }

  // check the prime trust status and if user is not exist in prime trust, create a new user
  let ptStatus = false;
  await axios({
    method: "POST",
    data: {
      data: {
        type: "user",
        attributes: {
          email: req.body.email,
          name: req.body.userName,
          password: req.body.password,
        },
      },
    },
    url: "https://sandbox.primetrust.com/v2/users",
    // url: "https://sandbox.primetrust.com/v2/users",
  })
    .then((response) => {
      ptStatus = true;
      console.log("response", response.data);
    })
    .catch(async (err) => {
      await axios({
        method: "POST",
        params: {
          email: req.body.email,
          password: req.body.password,
        },
        url: "https://sandbox.primetrust.com/auth/jwts",
        // url: "https://sandbox.primetrust.com/v2/users",
      })
        .then((response) => {
          ptStatus = true;
          console.log("response", response.data);
        })
        .catch((err) => {
          ptStatus = false;
          console.log("error", err?.response?.data?.errors[0]?.title);
        });
      console.log("error", err?.response?.data?.errors[0]?.title);
    });

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

module.exports = {
  register,
};
