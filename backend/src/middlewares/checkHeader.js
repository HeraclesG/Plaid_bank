const Joi = require("joi");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");

const checkHeader =(req, res, next) => {
  if (!req.headers.authorization) {
    return next(new ApiError(httpStatus.BAD_REQUEST, "Invalid request"));
  }
  return next();
};

module.exports = checkHeader;
