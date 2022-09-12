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
  // let ptStatus = false;
  // let registerErr = "";
  // await axios({
  //   method: "POST",
  //   data: {
  //     data: {
  //       type: "user",
  //       attributes: {
  //         email: req.body.email,
  //         name: "Orocash",
  //         password: req.body.password,
  //       },
  //     },
  //   },
  //   url: "https://sandbox.primetrust.com/v2/users",
  //   // url: "https://sandbox.primetrust.com/v2/users",
  // })
  //   .then((response) => {
  //     ptStatus = true;
  //     console.log("response", response.data);
  //   })
  //   .catch(async (err) => {
  //     await axios({
  //       method: "POST",
  //       params: {
  //         email: req.body.email,
  //         password: req.body.password,
  //       },
  //       url: "https://sandbox.primetrust.com/auth/jwts",
  //       // url: "https://sandbox.primetrust.com/v2/users",
  //     })
  //       .then((response) => {
  //         ptStatus = true;
  //         console.log("response", response.data);
  //       })
  //       .catch((err) => {
  //         ptStatus = false;
  //         console.log("error", err?.response?.data?.errors[0]?.title);
  //       });
  //     console.log("error", err?.response?.data?.errors[0]?.title);
  //   });

  // if (ptStatus === false) {
  //   res
  //     .status(httpStatus.INTERNAL_SERVER_ERROR)
  //     .send({ message: "Registered User. Input correct password." });
  //   return;
  // }

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

const login = catchAsync(async (req, res) => {
  const { userName, password, pin } = req.body;
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
};
