const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Quiz = require("../models/quizModel");
const Question = require("../models/questionModel");

const getQuestions = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  var questions = await Question.find({ quizId: id });

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
  newQuestion
    .save()
    .then(() => res.status(200).send())
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
    .then((result) => res.status(200).send(result))
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
