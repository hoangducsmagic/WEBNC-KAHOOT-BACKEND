const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Question = require("../models/questionModel");
const streamUpload = require("../utils/streamUpload");
const cloudinary = require("../config/cloudinary");

const getQuestions = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  var questions = await Question.find({ quizId: id });
  questions = questions.map((question) => {
    if (question._doc.image && Object.keys(question._doc.image).length > 0) {
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
      if (result._doc.image && Object.keys(result._doc.image).length > 0) {
        result._doc.image = result._doc.image.url;
      }
      res.status(200).send(result);
    })
    .catch((err) => next(new AppError(500, err.toString())));
});

const deleteQuestion = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  var question = await Question.findOne({ _id: id });
  if (question._doc.image && Object.keys(question._doc.image).length > 0) {
    var cloudinaryId = question._doc.image.cloudinaryId;
    await cloudinary.uploader.destroy(cloudinaryId);
  }
  Question.deleteOne({ _id: id })
    .then((result) => res.status(200).send(result))
    .catch((err) => next(new AppError(500, err.toString())));
});

const getQuestion = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  Question.findOne({ _id: id })
    .then((result) => {
      if (result._doc.image && Object.keys(result._doc.image).length > 0) {
        result._doc.image = result._doc.image.url;
      }
      res.status(200).send(result);
    })
    .catch((err) => next(new AppError(500, err.toString())));
});

const updateQuestion = catchAsync(async (req, res, next) => {
  let { id, question, answer1, answer2, answer3, answer4, correctAnswer } =
    req.body;
  var newImage;
  var oldQuestion = await Question.findOne({ _id: id });
  // remove image
  if (req.body.image==''){
    if (oldQuestion._doc.image && Object.keys(oldQuestion._doc.image).length > 0) {
      let cloudinaryId = oldQuestion._doc.image.cloudinaryId;
      await cloudinary.uploader.destroy(cloudinaryId);
      newImage = {};
    }
  }

  if (req.file) {
    // check if the question image is exsited
    // then delete the old one
    if (oldQuestion._doc.image && Object.keys(oldQuestion._doc.image).length > 0) {
      let cloudinaryId = oldQuestion._doc.image.cloudinaryId;
      await cloudinary.uploader.destroy(cloudinaryId);
      newImage = {};
    }

    // upload the new one
    try {
      uploadResult = await streamUpload(req);
      let cloudinaryId = uploadResult.public_id;
      let imageUrl = uploadResult.url;
      newImage={};
      newImage.url = imageUrl;
      newImage.cloudinaryId = cloudinaryId;

    } catch (err) {
      next(new AppError(500, err.toString()));
    }
  }

  Question.updateOne(
    { _id: id },
    {
      question: question,
      answer: answer1,
      answer2: answer2,
      answer3: answer3,
      answer4: answer4,
      correctAnswer: correctAnswer,
      image: newImage,
    }
  )
    .then(async () => {
      var question = await Question.findOne({ _id: id });

      if (question._doc.image && Object.keys(question._doc.image).length > 0) {
        question._doc.image = question._doc.image.url;
      }
      res.status(200).send(question);
    })
    .catch((err) => next(new AppError(500, err.toString())));
});

module.exports = {
  getQuestions,
  deleteQuestion,
  addQuestion,
  getQuestion,
  updateQuestion,
};
