const Joi = require("joi");

const setAccount = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
    accountId: Joi.string().required(),
  }),
};

const uploadDocuments = {
  body: Joi.object().keys({
    type: Joi.string().required(),
    userId: Joi.string().required(),
  }),
};

const depositFund = {
  body: Joi.object().keys({
    bankAccountName: Joi.string().required(),
    bankAccountNumber: Joi.string().required(),
    routingNumber: Joi.string().required(),
    amount: Joi.string().required(),
  }),
};

module.exports = {
  setAccount,
  uploadDocuments,
  depositFund,
};
