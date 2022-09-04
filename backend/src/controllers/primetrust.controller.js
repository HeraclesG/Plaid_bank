const httpStatus = require("http-status");
const { uuid } = require("uuidv4");
const axios = require("axios");
const fs = require("fs/promises");
const FormData = require("form-data");
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
    url: "https://sandbox.primetrust.com/v2/users",
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
  console.log(email, password);
  await axios({
    method: "POST",
    params: {
      email,
      password,
    },
    url: "https://sandbox.primetrust.com/auth/jwts",
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

const getAccounts = catchAsync(async (req, res) => {
  console.log(req.headers.authorization);
  await axios({
    method: "GET",
    headers: { Authorization: req.headers.authorization },
    url: "https://sandbox.primetrust.com/v2/accounts",
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

const createIndividualAccount = catchAsync(async (req, res) => {
  await axios({
    method: "POST",
    headers: { Authorization: req.headers.authorization },
    data: {
      data: {
        type: "account",
        attributes: {
          "account-type": "custodial",
          name: "Dragon Account",
          "authorized-signature": "John Connor",
          owner: {
            "contact-type": "natural_person",
            name: "John Connor",
            email: "dragondev93@gmail.com",
            "date-of-birth": "1971-01-01",
            "tax-id-number": "111223333",
            "tax-country": "US",
            geolocation: "+40.6894-074.0447",
            "ip-address": "2001:db8:3333:4444:5555:6666:7777:8888",
            "primary-phone-number": {
              country: "US",
              number: "123456789",
              sms: true,
            },
            "primary-address": {
              "street-1": "NaKaKu",
              "street-2": "Apt 260",
              "postal-code": "89145",
              city: "Las Vegas",
              region: "NV",
              country: "US",
            },
          },
        },
      },
    },
    url: "https://sandbox.primetrust.com/v2/accounts?include=owners,contacts,webhook-config",
    // url: "https://sandbox.primetrust.com/v2/users",
  })
    .then((response) => {
      console.log("response", response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log("error", err?.response?.data?.errors);
      res.status(400).send({ message: err.response?.data?.errors[0]?.title });
    });
});

const uploadDocuments = catchAsync(async (req, res) => {
  const { isFirst } = req.body;
  const uploadedFile = await fs.readFile(req.file.path);
  const form = new FormData();
  form.append("file", uploadedFile, {
    "content-type": "application/pdf",
  });
  await axios({
    method: "POST",
    headers: { Authorization: req.headers.authorization },
    data: {
      "contact-id": req.body.contact_id,
      label: isFirst ? "Front Driver's License" : "Backside Driver's License",
      description: isFirst
        ? "Front of Driver's License"
        : "Back of Driver's License",
      file: req.file,
      public: true,
    },
    url: "https://sandbox.primetrust.com/v2/uploaded-documents",
  })
    .then((response) => {
      console.log("response", response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log("error", err.response?.data?.errors);
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
    url: "https://sandbox.primetrust.com/auth/jwts",
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
    url: "https://sandbox.primetrust.com/v2/account-aggregate-policies",
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

const createResourceTokens = catchAsync(async (req, res) => {
  const { resourceId } = req.body;
  await axios({
    method: "POST",
    data: {
      data: {
        type: "resource-tokens",
        attributes: {
          "resource-id": resourceId,
          "resource-type": "user",
          "resource-token-type": "create_account",
        },
      },
    },
    url: "https://sandbox.primetrust.com/v2/resource-tokens",
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

const getResourceTokens = catchAsync(async (req, res) => {
  await axios({
    method: "GET",
    url: "https://sandbox.primetrust.com/v2/resource-tokens",
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
  getAccounts,
  createIndividualAccount,
  uploadDocuments,
  accountPolicy,
  agreementPreviews,
  createResourceTokens,
  getResourceTokens,
};
