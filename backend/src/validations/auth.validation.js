const Joi = require("joi");
const { password, pin } = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().required().email(),
    birthday: Joi.string().required(),
    taxIdNum: Joi.string().required(),
    taxCountry: Joi.string().required(),
    phone: Joi.string().required(),
    city: Joi.string().required(),
    region: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required(),
    street1: Joi.string().required(),
    street2: Joi.string().required(),
    pin: Joi.string().required().custom(pin),
    accountId: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required().custom(password),
    pin: Joi.string().required().custom(pin),
  }),
};

module.exports = {
  register,
  login
};


