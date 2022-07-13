const validator = require("express-joi-validation").createValidator({});
const Joi = require("joi");

const loginValidator = validator.body(
  Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  })
);

const signupValidator = validator.body(
  Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email(),
    dob:Joi.date()
  })
);

module.exports={loginValidator,signupValidator}
  