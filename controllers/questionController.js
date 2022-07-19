const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Question = require("../models/questionModel");
const streamUpload=require('../utils/streamUpload')

const getQuestions = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  var questions = await Question.find({ quizId: id });
  questions = questions.map((question) => {
    if (question._doc.image) {
      question._doc.image = question._doc.image.url;
    }
    return question;
  });
  res.status(200).send(questions);
});

const addQuestion = catchAsync(async (req, res, next) => {
  let { id, question, answer1, answer2, answer3, answer4, correctAnswer } =
    req.body;

  var newQuestion = new Question({
    quizId: id,
    question: question,
    answer1: answer1,
    answer2: answer2,
    answer3: answer3,
    answer4: answer4,
    correctAnswer: correctAnswer,
  });

  var uploadResult;
  if (req.file) {
    try {
      uploadResult = await streamUpload(req);
      var cloudinaryId = uploadResult.public_id;
      var imageUrl = uploadResult.url;
      newQuestion.image.url = imageUrl;
      newQuestion.image.cloudinaryId = cloudinaryId;
    } catch (err) {
      next(new AppError(500, err.toString()));
    }
  }

  newQuestion
    .save()
    .then((result) => {
      if (result._doc.image) {
        result._doc.image = result._doc.image.url;
      }
      res.status(200).send(result);
    })
    .catch((err) => next(new AppError(500, err.toString())));
});

const deleteQuestion = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  Question.deleteOne({ _id: id })

    .then(() => res.status(200).send())
    .catch((err) => next(new AppError(500, err.toString())));
});

const getQuestion = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  Question.findOne({ _id: id })
    .then((result) => {
      if (result._doc.image) {
        result._doc.image = result._doc.image.url;
      }
      res.status(200).send(result);
    })
    .catch((err) => next(new AppError(500, err.toString())));
});

const updateQuestion = catchAsync(async (req, res, next) => {
  let { id, question, answer1, answer2, answer3, answer4, correctAnswer } =
    req.body;
  Question.updateOne(
    { _id: id },
    {
      question: question,
      answer: answer1,
      answer2: answer2,
      answer3: answer3,
      answer4: answer4,
      correctAnswer: correctAnswer,
    }
  )
    .then((result) => res.status(200).send(result))
    .catch((err) => next(new AppError(500, err.toString())));
});

module.exports = {
  getQuestions,
  deleteQuestion,
  addQuestion,
  getQuestion,
  updateQuestion,
};
