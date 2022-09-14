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
    contactId: Joi.string().required(),
  }),
};

module.exports = {
  setAccount,
  uploadDocuments,
};
