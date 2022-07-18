const validator = require("express-joi-validation").createValidator({});
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const newQuizValidate = validator.body(
  Joi.object({
    name: Joi.string().required(),
    info: Joi.string().optional(),
  })
);

const updateQuizValidate = validator.body(
  Joi.object({
    id: Joi.objectId().required(),  //quiz id
    name: Joi.string().optional(),
    info: Joi.string().optional(),
  })
);

module.exports = { newQuizValidate,updateQuizValidate };
