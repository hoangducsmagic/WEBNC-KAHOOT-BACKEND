const express = require("express");
const router = express.Router();

const quizController = require("../controllers/quizController");
const {
  newQuizValidate,
  updateQuizValidate,
} = require("../validators/quizValidator");

router.post("/newquiz", newQuizValidate, quizController.newQuiz);
router.get("/getQuizzes", quizController.getQuizzes);
router.get("/getquiz/:id", quizController.getQuiz);
router.put("/updatequiz", updateQuizValidate, quizController.updateQuiz);
router.delete("/deletequiz/:id", quizController.deleteQuiz);

module.exports = router;
