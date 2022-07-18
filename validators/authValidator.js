const validator = require("express-joi-validation").createValidator({});
const Joi = require("joi");

const loginValidate = validator.body(
  Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  })
);

const registerValidate = validator.body(
  Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  })
);

module.exports={loginValidate,registerValidate}
  