const httpStatus = require("http-status");
const { uuid } = require("uuidv4");
const axios = require("axios");
const catchAsync = require("../utils/catchAsync");

const createUser = catchAsync(async (req, res) => {
  const { email, name, password } = req.body;
  await axios({
    method: "POST",
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
  console.log(email, password)
  await axios({
    method: "POST",
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

const agreementPreviews = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  await axios({
    method: "POST",
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

const accountPolicy = catchAsync(async (req, res) => {
  await axios({
    method: "GET",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdXRoX3NlY3JldCI6IjBhMDdjZDAyLTlhNzAtNDkzZS1hYjU5LWUxNjZkZDdiMDlkYyIsInVzZXJfZ3JvdXBzIjpbXSwibm93IjoxNjYxNDA1Mzk4LCJleHAiOjE2NjIwMTAxOTh9.4tBzk45vuAmOWiY6HfgXYDllxzQ91VnFyJzf0IKPAxk",
    },
    url: "https://api.primetrust.com/v2/account-aggregate-policies",
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
  accountPolicy,
  agreementPreviews
};