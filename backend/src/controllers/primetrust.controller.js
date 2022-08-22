const httpStatus = require("http-status");
const { uuid } = require("uuidv4");
const axios = require("axios");
const catchAsync = require("../utils/catchAsync");

const createUser = catchAsync(async (req, res) => {
  await axios({
    method: "POST",
    headers: { "X-Idempotent-ID": "a94128fa-187a-44ba-b2d0-a2a9bbf9988b" },
    data: {
      type: "user",
      attributes: {
        email: "dragondev93@gmail.com",
        name: "dragon",
        password: "1qazXSW@#EDC",
      },
    },
    url: "http://api.primetrust.com/v2/users",
    // url: "http://sandbox.primetrust.com/v2/users",
  })
    .then((res) => {
      console.log("response", res.data);
    })
    .catch((err) => {
      console.log("error", err.response.data);
    });

  res.send("ok");
});

module.exports = {
  createUser,
};
