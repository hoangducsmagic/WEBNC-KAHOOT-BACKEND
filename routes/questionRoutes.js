const express = require("express");
const router = express.Router();

const questionController = require("../controllers/questionController");
const {
  addQuestionValidate,
  updateQuestionValidate,
} = require("../validators/questionValidator");

router.post(
  "/newquestion",
  addQuestionValidate,
  questionController.addQuestion
);
router.get("/getquestions/:id", questionController.getQuestions);
router.get("/getquestion/:id", questionController.getQuestion);
router.put(
  "/updatequestion",
  updateQuestionValidate,
  questionController.updateQuestion
);
router.delete("/deletequestion/:id", questionController.deleteQuestion);

module.exports = router;
