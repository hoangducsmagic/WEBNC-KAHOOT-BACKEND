const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Quiz = require("../models/quizModel");
const Question = require("../models/questionModel");

const getQuizzes = catchAsync(async (req, res, next) => {
  let { id } = req.user;
  console.log(req.user);
  var quizzes = await Quiz.find({ userId: id });
  console.log(quizzes)
  res.status(200).send(quizzes);
});

const newQuiz = catchAsync(async (req, res, next) => {
  let { id } = req.user;
  let { name, info } = req.body;
  var quiz = new Quiz({ userId: id, quizName: name, info: info });
  quiz
    .save()
    .then((result) => res.status(200).send(result))
    .catch((err) => {
      return next(new AppError(500, err.toString()));
    });
});

const deleteQuiz = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  Quiz.deleteOne({ _id: id })

    .then((result) => res.status(200).send(result))
    .catch((err) => next(new AppError(500, err.toString())));
});

const updateQuiz = catchAsync(async (req, res, next) => {
  let { id, newName, newInfo } = req.body;
  Quiz.updateOne({ _id: id }, { quizName: newName, info: newInfo })
    .then((result) => res.status(200).send(result))
    .catch((err) => next(new AppError(500, err.toString())));
});

const getQuiz = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  Quiz.findOne({ _id: id })
    .then((result) => {
      if (!result) return next(new AppError(404, "Quiz not found"));
      res.status(200).send(result);
    })
    .catch((err) => next(new AppError(500, err.toString())));
});

module.exports = {
  getQuizzes,
  newQuiz,
  deleteQuiz,
  updateQuiz,
  getQuiz,
};
