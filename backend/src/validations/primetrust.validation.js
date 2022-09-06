const Joi = require("joi");

const setAccount = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
    accountId: Joi.string().required(),
  }),
};

module.exports = {
  setAccount,
};

