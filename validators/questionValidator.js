const validator = require("express-joi-validation").createValidator({});
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const addQuestionValidate = validator.body(
  Joi.object({
    id: Joi.objectId().required(),  //quiz id
    question: Joi.string().required(),
    answer1: Joi.string().required(),
    answer2: Joi.string().required(),
    answer3: Joi.string().required(),
    answer4: Joi.string().required(),
    correctAnswer: Joi.number().integer().min(1).max(4).required(),
  })
);

const updateQuestionValidate = validator.body(
  Joi.object({
    id: Joi.objectId().optional(),  //question id
    image:Joi.optional(),
    question: Joi.string().optional(),
    answer1: Joi.string().optional(),
    answer2: Joi.string().optional(),
    answer3: Joi.string().optional(),
    answer4: Joi.string().optional(),
    correctAnswer: Joi.number().integer().min(1).max(4).optional(),
  })
);


module.exports={addQuestionValidate,updateQuestionValidate}
  