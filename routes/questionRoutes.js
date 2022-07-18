const express = require("express");
const multer = require("multer");
const questionController = require("../controllers/questionController");
const {
  addQuestionValidate,
  updateQuestionValidate,
} = require("../validators/questionValidator");

const router = express.Router();
const  fileUpload = multer()

router.post(
  "/newquestion",
  fileUpload.single('image'),
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
