const httpStatus = require("http-status");
const { uuid } = require("uuidv4");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const catchAsync = require("../utils/catchAsync");
const { User } = require("../models");
const config = require("../config/config");
const { deserializeUser } = require("passport");
const { collection } = require("../models/pay.method.model");

const { ptToken } = config.jwt;
const primeTrustUrl = config.primeTrust.url;

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
    url: `${primeTrustUrl}/v2/users`,
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
    url: `${primeTrustUrl}/auth/jwts`,
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
    headers: { Authorization: ptToken },
    url: `${primeTrustUrl}/v2/accounts?filter[status]=opened`,
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

const setAccount = catchAsync(async (req, res) => {
  const { accountId, userName } = req.body;
  await axios({
    method: "GET",
    headers: { Authorization: ptToken },
    url: `${primeTrustUrl}/v2/users`,
  })
    .then(async (response) => {
      const email = response.data.data[0].attributes.email;
      let currentUser = await User.findOne({ userName });

      if (!currentUser) {
        res.status(400).send({ message: "User is not existed" });
        return;
      }

      if (email != currentUser.email) {
        res.status(400).send({ message: "Invalid user" });
        return;
      }
      console.log(currentUser);
      currentUser.accountId = accountId;
      const newUser = await currentUser.save();
      console.log(newUser);
      res.send(response.data);
    })
    .catch((err) => {
      console.log("error", err);
      res.status(400).send({ message: err.response?.data?.errors[0]?.title });
    });
});

const createIndividualAccount = catchAsync(async (req, res) => {
  await axios({
    method: "POST",
    headers: { Authorization: ptToken },
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
            email: "blackhole.rsb@gmail.com",
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
    url: `${primeTrustUrl}/v2/accounts?include=owners,contacts,webhook-config`,
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
  if (!req.file) {
    res.status(400).send({ message: "Please upload a file" });
    return;
  }

  const user = await User.findOne({ _id: req.body.userId });
  if (!user) {
    res.status(400).send({ message: "Invalid User." });
    return;
  }
  console.log(user);
  const { type } = req.body;
  let label = "";
  let description = "";
  switch (type) {
    case "driverBack":
      label = "Back of Driver's License";
      description = "Backside Driver's License";
      break;
    case "driverFront":
      label = "Front of Driver's License";
      description = "Frontside Driver's License";
      break;
    case "governmentId":
      label = "Government ID";
      description = "Government ID";
      break;
    case "passport":
      label = "Passport";
      description = "Passport";
      break;
    case "residencePermitFront":
      label = "Front of Residence Permit";
      description = "Frontside Residence Permit";
      break;
    case "residencePermitBack":
      label = "Back of Residence Permit";
      description = "Backside Residence Permit";
      break;
    case "utilityBill":
      label = "Utility Bill";
      description = "Utility Bill";
      break;
  }
  const uploadedFile = fs.createReadStream(req.file.path);
  const uploadedInfo = new FormData();
  uploadedInfo.append("file", uploadedFile);
  uploadedInfo.append("contact-id", user.contactId);
  uploadedInfo.append("description", description);
  uploadedInfo.append("label", label);
  uploadedInfo.append("public", "true");
  // console.log(uploadedFile);
  await axios({
    method: "POST",
    headers: {
      Authorization: ptToken,
    },
    data: uploadedInfo,
    url: `${primeTrustUrl}/v2/uploaded-documents`,
  })
    .then((response) => {
      // console.log("response", response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log("error", err.response?.data?.errors);
      res.status(400).send({ message: err.response?.data?.errors[0]?.detail });
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
    url: `${primeTrustUrl}/auth/jwts`,
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
      authorization: ptToken,
    },
    url: `${primeTrustUrl}/v2/account-aggregate-policies`,
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
    url: `${primeTrustUrl}/v2/resource-tokens`,
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
    url: `${primeTrustUrl}/v2/resource-tokens`,
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

const fakeFund = catchAsync(async (req, res) => {
  await axios({
    method: "POST",
    headers: {
      Authorization: ptToken,
    },
    data: {
      data: {
        type: "accounts",
        attributes: {
          amount: "50000",
        },
      },
    },
    url: `${primeTrustUrl}/v2/accounts/1a5004ce-1254-4ce9-93af-254b7261be8b/sandbox/fund`,
  })
    .then((response) => {
      console.log(response.data);
      res.send({ amount: response.data });
    })
    .catch((err) => {
      console.log("error", err?.response?.data?.errors[0]?.title);
      res.status(400).send({ message: err.response?.data?.errors[0]?.detail });
    });
});

const depositFund = catchAsync(async (req, res) => {
  let fundsTransferMethodId = "";
  await axios({
    method: "POST",
    headers: {
      Authorization: ptToken,
    },
    data: {
      data: {
        type: "funds-transfer-methods",
        attributes: {
          "contact-id": req.user.contactId,
          "bank-account-name": req.body.bankAccountName,
          "routing-number": req.body.routingNumber,
          "bank-account-type": "checking",
          "bank-account-number": req.body.bankAccountNumber,
          "ach-check-type": "personal",
          "funds-transfer-type": "ach",
        },
      },
    },
    url: `${primeTrustUrl}/v2/funds-transfer-methods`,
  })
    .then(async (response) => {
      fundsTransferMethodId = response.data.data.id;
      await axios({
        method: "POST",
        headers: {
          Authorization: ptToken,
        },
        data: {
          data: {
            type: "contributions",
            attributes: {
              amount: req.body.amount,
              "contact-id": req.user.contactId,
              "funds-transfer-method-id": fundsTransferMethodId,
              "account-id": req.user.accountId,
            },
          },
        },
        url: `${primeTrustUrl}/v2/contributions?include=funds-transfer`,
      }).then(async (resp1) => {
        res.send(resp1.data);
        console.log(resp1.data.included[0].id);
        //settle deposit -- we have to remove this in real production
        // --------------------------------------------------------- remove this -----------------------------------------------------------//
        await axios({
          method: "POST",
          headers: {
            Authorization: ptToken,
          },
          url: `${primeTrustUrl}/v2/funds-transfers/${resp1.data.included[0].id}/sandbox/settle`,
        })
          .then(async (resp2) => {
            await axios({
              method: "GET",
              headers: {
                Authorization: ptToken,
              },
              url: `${primeTrustUrl}/v2/funds-transfers?filter[id eq]=${resp1.data.included[0].id}&include=contingent-holds`,
            })
              .then(async (resp3) => {
                console.log(resp3.data);
                await axios({
                  method: "POST",
                  headers: {
                    Authorization: ptToken,
                  },
                  url: `${primeTrustUrl}/v2/contingent-holds/${resp3.data.included[0].id}/sandbox/clear`,
                })
                  .then(async (resp4) => {
                    console.log("first is approved", resp4.data);
                    await axios({
                      method: "POST",
                      headers: {
                        Authorization: ptToken,
                      },
                      url: `${primeTrustUrl}/v2/contingent-holds/${resp3.data.included[1].id}/sandbox/clear`,
                    })
                      .then(async (resp5) => {
                        console.log("second is approved", resp5.data);
                      })
                      .catch((err) => {
                        console.log(err.response.data);
                      });
                  })
                  .catch(async (err) => {
                    console.log(err.response.data);
                    await axios({
                      method: "POST",
                      headers: {
                        Authorization: ptToken,
                      },
                      url: `${primeTrustUrl}/v2/contingent-holds/${resp3.data.included[1].id}/sandbox/clear`,
                    })
                      .then(async (resp5) => {
                        console.log("second is approved", resp5.data);
                      })
                      .catch((err) => {
                        console.log(err.response.data);
                      });
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log("error", err?.response?.data?.errors);
      res.status(400).send({ message: err.response?.data?.errors[0]?.detail });
    });
});

const getFundBalance = catchAsync(async (req, res) => {
  await axios({
    method: "GET",
    headers: {
      Authorization: ptToken,
    },
    url: `${primeTrustUrl}/v2/account-cash-totals?account.id=${req.user.accountId}`,
  })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log("error", err?.response?.data?.errors[0]?.title);
      res.status(400).send({ message: err.response?.data?.errors[0]?.title });
    });
});

const transferFund = catchAsync(async (req, res) => {
  await axios({
    method: "POST",
    headers: {
      Authorization: ptToken,
    },
    data: {
      data: {
        type: "account-cash-transfers",
        attributes: {
          amount: req.body.amount,
          "from-account-id": req.user.accountId,
          "to-account-id": req.body.receiverAccountId,
        },
      },
    },
    url: `${primeTrustUrl}/v2/account-cash-transfers?include=from-account-cash-totals,to-account-cash-totals`,
  })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log("error", err?.response?.data?.errors[0]);
      res.status(400).send({ message: err.response?.data?.errors[0]?.detail });
    });
});

// asset-transfer-methods?account.id=7714d097-b814-40f8-ae64-76281ef27b95
const depositAsset = catchAsync(async (req, res) => {
  let assetTransferMethod;
  let address = "";
  await axios({
    method: "GET",
    headers: {
      Authorization: ptToken,
    },
    url: `${primeTrustUrl}/v2/asset-transfer-methods?account.id=${req.user.accountId}`,
  })
    .then(async (response) => {
      let methods = [];
      if (response.data.data.length > 0) {
        methods = await response.data.data.filter((method) => {
          return method.attributes.label === "Deposit Address for USDC";
        });
      }
      if (methods.length > 0) {
        assetTransferMethod = methods[0].id;
        address = methods[0].attributes["wallet-address"];
      } else {
        await axios({
          method: "POST",
          headers: {
            Authorization: ptToken,
          },
          data: {
            data: {
              type: "asset-transfer-methods",
              attributes: {
                label: "Deposit Address for USDC",
                // "cost-basis": 1,
                // "acquisition-on": new Date(),
                // "currency-type": "USD",
                "asset-id": "15593c9b-f00d-483e-8958-422e42440a76",
                "contact-id": req.user.contactId,
                "account-id": req.user.accountId,
                "transfer-direction": "incoming",
                "single-use": false,
                "asset-transfer-type": "ethereum",
              },
            },
          },
          url: `${primeTrustUrl}/v2/asset-transfer-methods`,
        })
          .then(async (response) => {
            assetTransferMethod = response.data.data.id;
            address = response.data.data.attributes["wallet-address"];
          })
          .catch((err) => {
            console.log("error", err?.response?.data);
            res
              .status(400)
              .send({ message: err.response?.data?.errors[0]?.detail });
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  console.log("sssssssssss", assetTransferMethod);
  res.send({ address: address });
  // ---------------------------------------------- remove this in real production ----------------------------------------------------- //
  await axios({
    method: "POST",
    headers: {
      Authorization: ptToken,
    },
    data: {
      data: {
        type: "asset-contributions",
        attributes: {
          "unit-count": 10000,
          "asset-id": "15593c9b-f00d-483e-8958-422e42440a76",
          "account-id": req.user.accountId,
          "contact-id": req.user.contactId,
          "asset-transfer-method-id": assetTransferMethod,
          // "acquisition-on" : new Date(),
          // "cost-basis" : 1,
          // "currency-type" : "USD"
        },
      },
    },
    url: `${primeTrustUrl}/v2/asset-contributions?include=asset-transfer-method,asset-transfer`,
  })
    .then(async (resp1) => {
      await axios({
        method: "POST",
        headers: {
          Authorization: ptToken,
        },
        url: `${primeTrustUrl}/v2/asset-transfers/${resp1.data.included[1].id}/sandbox/settle`,
      })
        .then(async (resp2) => {
          // console.log(resp2.data);
          console.log("resp2.data");
        })
        .catch((err) => {
          console.log("error", err?.response?.data);
        });
    })
    .catch((err) => {
      console.log("error", err?.response?.data);
    });
});

const getAssetBalance = catchAsync(async (req, res) => {
  await axios({
    method: "GET",
    headers: {
      Authorization: ptToken,
    },
    url: `${primeTrustUrl}/v2/account-asset-totals?account.id=${req.user.accountId}`,
  })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log("error", err?.response?.data?.errors[0]?.title);
      res.status(400).send({ message: err.response?.data?.errors[0]?.title });
    });
});

const transferAsset = catchAsync(async (req, res) => {
  await axios({
    method: "POST",
    headers: {
      Authorization: ptToken,
    },
    data: {
      data: {
        type: "internal-asset-transfers",
        attributes: {
          "unit-count": req.body.amount,
          "asset-id": "15593c9b-f00d-483e-8958-422e42440a76",
          "from-account-id": req.user.accountId,
          "to-account-id": req.body.receiverAccountId,
          reference: "For Trade Settlement",
        },
      },
    },
    url: `${primeTrustUrl}/v2/internal-asset-transfers`,
  })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log("error", err?.response?.data?.errors[0]);
      res.status(400).send({ message: err.response?.data?.errors[0]?.detail });
    });
});

const fundSimpleTransactionHistory = catchAsync(async (req, res) => {
  await axios({
    method: "GET",
    headers: {
      Authorization: ptToken,
    },
    url: `${primeTrustUrl}/v2/cash-transactions?account.id=${req.user.accountId}`,
    // url: `${primeTrustUrl}/v2/funds-transfers?account.id=${req.user.accountId}`,
  })
    .then(async (response) => {
      let history = [];
      if (response.data.data.length < 5) {
        const res_data = await Promise.all(
          response.data.data.map(async (i) => {
            let actorAccount;
            if (i.attributes["comments-1"].split(" ")[0] === "Transfer") {
              actorAccount = await axios({
                method: "GET",
                headers: {
                  Authorization: ptToken,
                },
                url: `${primeTrustUrl}/v2/accounts?filter[number]=${
                  i.attributes["comments-1"].split(" ")[2]
                }`,
              });
              return {
                ...i.attributes,
                userName: actorAccount.data.data[0].attributes.name,
              };
            } else {
              return {
                ...i.attributes,
                userName: "Self",
              };
            }
          })
        );
        console.log(res_data);
        res.send(res_data);
        return;
      }
      const skippedData = response.data.data.slice(0, 5);
      const res_data = await Promise.all(
        skippedData.map(async (i) => {
          let actorAccount;
          if (i.attributes["comments-1"].split(" ")[0] === "Transfer") {
            actorAccount = await axios({
              method: "GET",
              headers: {
                Authorization: ptToken,
              },
              url: `${primeTrustUrl}/v2/accounts?filter[number]=${
                i.attributes["comments-1"].split(" ")[2]
              }`,
            });
            return {
              ...i.attributes,
              userName: actorAccount.data.data[0].attributes.name,
            };
          } else {
            return {
              ...i.attributes,
              userName: "Self",
            };
          }
        })
      );
      console.log(res_data);
      res.send(res_data);
    })
    .catch((err) => {
      console.log("error", err?.response?.data?.errors[0]);
      res.status(400).send({ message: err.response?.data?.errors[0]?.detail });
    });
});

const fundTransactionHistory = catchAsync(async (req, res) => {
  await axios({
    method: "GET",
    headers: {
      Authorization: ptToken,
    },
    // url: `${primeTrustUrl}/v2/cash-transactions?account.id=${req.user.accountId}`,
    url: `${primeTrustUrl}/v2/cash-transactions?account.id=${req.user.accountId}`,
  })
    .then(async (response) => {
      const res_data = await Promise.all(
        response.data.data.map(async (i) => {
          let actorAccount;
          if (i.attributes["comments-1"].split(" ")[0] === "Transfer") {
            actorAccount = await axios({
              method: "GET",
              headers: {
                Authorization: ptToken,
              },
              url: `${primeTrustUrl}/v2/accounts?filter[number]=${
                i.attributes["comments-1"].split(" ")[2]
              }`,
            });
            return {
              ...i.attributes,
              userName: actorAccount.data.data[0].attributes.name,
            };
          } else {
            return {
              ...i.attributes,
              userName: "Self",
            };
          }
        })
      );
      console.log(res_data);
      res.send(res_data);
    })
    .catch((err) => {
      console.log("error", err);
      res.status(400).send({ message: err.response?.data?.errors[0]?.detail });
    });
});

const assetSimpleTransactionHistory = catchAsync(async (req, res) => {
  await axios({
    method: "GET",
    headers: {
      Authorization: ptToken,
    },
    url: `${primeTrustUrl}/v2/asset-transactions?account.id=${req.user.accountId}`,
    // url: `${primeTrustUrl}/v2/funds-transfers?account.id=${req.user.accountId}`,
  })
    .then(async (response) => {
      if (response.data.data.length < 5) {
        const res_data = await Promise.all(
          response.data.data.map(async (i) => {
            let actorAccount;
            if (i.attributes["comments-1"].split(" ")[0] === "Transfer") {
              actorAccount = await axios({
                method: "GET",
                headers: {
                  Authorization: ptToken,
                },
                url: `${primeTrustUrl}/v2/accounts?filter[number]=${
                  i.attributes["comments-1"].split(" ")[2]
                }`,
              });
              return {
                ...i.attributes,
                userName: actorAccount.data.data[0].attributes.name,
              };
            } else {
              return {
                ...i.attributes,
                userName: "Self",
              };
            }
          })
        );
        res.send(res_data);
        return;
      }
      const skippedData = response.data.data.slice(0, 5);
      const res_data = await Promise.all(
        skippedData.map(async (i) => {
          let actorAccount;
          if (i.attributes["comments-1"].split(" ")[0] === "Transfer") {
            actorAccount = await axios({
              method: "GET",
              headers: {
                Authorization: ptToken,
              },
              url: `${primeTrustUrl}/v2/accounts?filter[number]=${
                i.attributes["comments-1"].split(" ")[2]
              }`,
            });
            return {
              ...i.attributes,
              userName: actorAccount.data.data[0].attributes.name,
            };
          } else {
            return {
              ...i.attributes,
              userName: "Self",
            };
          }
        })
      );
      res.send(res_data);
    })
    .catch((err) => {
      console.log("error", err?.response?.data?.errors[0]);
      res.status(400).send({ message: err.response?.data?.errors[0]?.detail });
    });
});

const assetTransactionHistory = catchAsync(async (req, res) => {
  await axios({
    method: "GET",
    headers: {
      Authorization: ptToken,
    },
    url: `${primeTrustUrl}/v2/asset-transactions?account.id=${req.user.accountId}`,
  })
    .then(async (response) => {
      const res_data = await Promise.all(
        response.data.data.map(async (i) => {
          let actorAccount;
          if (i.attributes["comments-1"].split(" ")[0] === "Transfer") {
            actorAccount = await axios({
              method: "GET",
              headers: {
                Authorization: ptToken,
              },
              url: `${primeTrustUrl}/v2/accounts?filter[number]=${
                i.attributes["comments-1"].split(" ")[2]
              }`,
            });
            return {
              ...i.attributes,
              userName: actorAccount.data.data[0].attributes.name,
            };
          } else {
            return {
              ...i.attributes,
              userName: "Self",
            };
          }
        })
      );
      res.send(res_data);
    })
    .catch((err) => {
      console.log("error", err?.response?.data?.errors[0]);
      res.status(400).send({ message: err.response?.data?.errors[0]?.detail });
    });
});

const withdrawFund = catchAsync(async (req, res) => {
  let fundsTransferMethodId = "";
  await axios({
    method: "POST",
    headers: {
      Authorization: ptToken,
    },
    data: {
      data: {
        type: "funds-transfer-methods",
        attributes: {
          "contact-id": req.user.contactId,
          "bank-account-name": req.body.bankAccountName,
          "routing-number": req.body.routingNumber,
          "bank-account-number": req.body.bankAccountNumber,
          "funds-transfer-type": "wire",
        },
      },
    },
    url: `${primeTrustUrl}/v2/funds-transfer-methods?include=bank`,
  })
    .then(async (response) => {
      fundsTransferMethodId = response.data.data.id;
      await axios({
        method: "POST",
        headers: {
          Authorization: ptToken,
        },
        data: {
          data: {
            type: "disbursements",
            attributes: {
              amount: req.body.amount,
              "funds-transfer-method-id": fundsTransferMethodId,
              "account-id": req.user.accountId,
            },
          },
        },
        url: `${primeTrustUrl}/v2/disbursements?include=funds-transfer,disbursement-authorization`,
      }).then(async (resp1) => {
        res.send(resp1.data);
        //settle withdraw -- we have to remove this in real production
        // --------------------------------------------------------- remove this -----------------------------------------------------------//
        await axios({
          method: "GET",
          headers: {
            Authorization: ptToken,
          },
          url: `${primeTrustUrl}/v2/funds-transfers?filter[id eq]=${resp1.data.included[0].id}&include=disbursement-authorization`,
        })
          .then(async (resp2) => {
            await axios({
              method: "POST",
              headers: {
                Authorization: ptToken,
              },
              url: `${primeTrustUrl}/v2/disbursement-authorizations/${resp2.data.included[0].id}/sandbox/verify-owner`,
            })
              .then(async (resp3) => {
                await axios({
                  method: "POST",
                  headers: {
                    Authorization: ptToken,
                  },
                  url: `${primeTrustUrl}/v2/funds-transfers/${resp1.data.included[0].id}/sandbox/settle`,
                })
                  .then(async (resp4) => {
                    console.log("approved", resp4.data);
                  })
                  .catch(async (err) => {
                    console.log(err.response.data);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log("error", err?.response?.data?.errors);
      res.status(400).send({ message: err.response?.data?.errors[0]?.detail });
    });
});

const withdrawAsset = catchAsync(async (req, res) => {
  let assetTransferMethodId = "";
  await axios({
    method: "POST",
    headers: {
      Authorization: ptToken,
    },
    data: {
      data: {
        type: "asset-transfer-methods",
        attributes: {
          label: "Personal Wallet Address",
          "asset-id": "15593c9b-f00d-483e-8958-422e42440a76",
          "contact-id": req.user.contactId,
          "account-id": req.user.accountId,
          "wallet-address": req.body.walletAddress,
          "transfer-direction": "outgoing",
          "single-use": false,
          "asset-transfer-type": "ethereum",
        },
      },
    },
    url: `${primeTrustUrl}/v2/asset-transfer-methods`,
  })
    .then(async (response) => {
      assetTransferMethodId = response.data.data.id;
      await axios({
        method: "POST",
        headers: {
          Authorization: ptToken,
        },
        data: {
          data: {
            type: "asset-disbursements",
            attributes: {
              "asset-id": "15593c9b-f00d-483e-8958-422e42440a76",
              "asset-transfer": {
                "asset-transfer-method-id": assetTransferMethodId,
              },
              "unit-count": req.body.amount,
              "account-id": req.user.accountId,
              "contact-id": req.user.contactId,
            },
          },
        },
        url: `${primeTrustUrl}/v2/asset-disbursements?include=asset-transfer-method,asset-transfer`,
      }).then(async (resp1) => {
        res.send(resp1.data);
        //settle withdraw -- we have to remove this in real production
        // --------------------------------------------------------- remove this -----------------------------------------------------------//
        await axios({
          method: "GET",
          headers: {
            Authorization: ptToken,
          },
          url: `${primeTrustUrl}/v2/asset-transfers?include=disbursement-authorization`,
        })
          .then(async (resp2) => {
            await axios({
              method: "POST",
              headers: {
                Authorization: ptToken,
              },
              url: `${primeTrustUrl}/v2/disbursement-authorizations/${resp2.data.included[0].id}/sandbox/verify-owner`,
            })
              .then(async (resp3) => {
                await axios({
                  method: "POST",
                  headers: {
                    Authorization: ptToken,
                  },
                  url: `${primeTrustUrl}/v2/asset-transfers/${resp1.data.included[1].id}/sandbox/settle`,
                })
                  .then(async (resp4) => {
                    console.log("approved", resp4.data);
                  })
                  .catch(async (err) => {
                    console.log(err.response.data);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log("error", err?.response?.data?.errors);
      res.status(400).send({ message: err.response?.data?.errors[0]?.detail });
    });
});

const addContact = catchAsync(async (req, res) => {
  await axios({
    method: "GET",
    headers: {
      Authorization: ptToken,
    },
    // url: `${primeTrustUrl}/v2/cash-transactions?account.id=${req.user.accountId}`,
    url: `${primeTrustUrl}/v2/cash-transactions?account.id=${req.user.accountId}`,
  })
    .then(async (response) => {
      const res_data = await Promise.all(
        response.data.data.map(async (i) => {
          let actorAccount;
          if (i.attributes["comments-1"].split(" ")[0] === "Transfer") {
            actorAccount = await axios({
              method: "GET",
              headers: {
                Authorization: ptToken,
              },
              url: `${primeTrustUrl}/v2/accounts?filter[number]=${
                i.attributes["comments-1"].split(" ")[2]
              }`,
            });
            return {
              ...i.attributes,
              userName: actorAccount.data.data[0].attributes.name,
            };
          } else {
            return {
              ...i.attributes,
              userName: "Self",
            };
          }
        })
      );
      console.log(res_data);
      res.send(res_data);
    })
    .catch((err) => {
      console.log("error", err);
      res.status(400).send({ message: err.response?.data?.errors[0]?.detail });
    });
});

module.exports = {
  createUser,
  createJwt,
  getAccounts,
  setAccount,
  createIndividualAccount,
  uploadDocuments,
  accountPolicy,
  agreementPreviews,
  createResourceTokens,
  getResourceTokens,
  depositFund,
  getFundBalance,
  transferFund,
  fakeFund,
  depositAsset,
  getAssetBalance,
  transferAsset,
  fundSimpleTransactionHistory,
  fundTransactionHistory,
  assetSimpleTransactionHistory,
  assetTransactionHistory,
  withdrawFund,
  withdrawAsset,
  addContact
};
