const httpStatus = require("http-status");
const { uuid } = require("uuidv4");
const axios = require("axios");
const catchAsync = require("../utils/catchAsync");

const createUser = catchAsync(async (req, res) => {
  const { email, name, password } = req.body;
  await axios({
    method: "POST",
    headers: { "X-Idempotent-ID": "a94128fa-187a-44ba-b2d0-a2a9bbf9988b" },
    data: {
      data: {
        type: "user",
        attributes: {
          email,
          name,
          password,
        },
      },
    },
    url: "https://api.primetrust.com/v2/users",
    // url: "https://sandbox.primetrust.com/v2/users",
  })
    .then((response) => {
      console.log("response", response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log("error", err?.response?.data?.errors[0]?.title);
      res.status(400).send({ message: err.response?.data?.errors[0]?.title });
    });
});

const createJwt = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  await axios({
    method: "POST",
    headers: { "X-Idempotent-ID": "a94128fa-187a-44ba-b2d0-a2a9bbf9988b" },
    params: {
      email,
      password,
    },
    url: "https://api.primetrust.com/auth/jwts",
    // url: "https://sandbox.primetrust.com/v2/users",
  })
    .then((response) => {
      console.log("response", response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log("error", err?.response?.data?.errors[0]?.title);
      res.status(400).send({ message: err.response?.data?.errors[0]?.title });
    });
});

const openAccount = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  await axios({
    method: "POST",
    headers: { "X-Idempotent-ID": "a94128fa-187a-44ba-b2d0-a2a9bbf9988b" },
    params: {
      email,
      password,
    },
    url: "https://api.primetrust.com/auth/jwts",
    // url: "https://sandbox.primetrust.com/v2/users",
  })
    .then((response) => {
      console.log("response", response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log("error", err?.response?.data?.errors[0]?.title);
      res.status(400).send({ message: err.response?.data?.errors[0]?.title });
    });
});

module.exports = {
  createUser,
  createJwt,
  openAccount,
};
