const express = require("express");
const db = require("./config/db");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const authRouter = require("./routes/authRoutes");
const quizController = require("./controllers/quizController");
const questionController = require("./controllers/questionController");
const authController = require("./controllers/authController");
const auth=require('./middlewares/auth')

// Start express app
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Connect to db
db.connect();

//Middleware


// Routers

app.post("/api/newquiz", auth,quizController.newQuiz);
app.get("/api/getQuizzes",  auth,quizController.getQuizzes);
app.get("/api/getquiz/:id",  auth,quizController.getQuiz);
app.put("/api/updatequiz",  auth,quizController.updateQuiz);
app.delete("/api/deletequiz/:id",  auth,quizController.deleteQuiz);

app.post("/api/newquestion", auth, questionController.addQuestion);
app.get("/api/getquestions/:id",  auth,questionController.getQuestions);
app.get("/api/getquestion/:id",  auth,questionController.getQuestion);
app.put("/api/updatequestion",  auth,questionController.updateQuestion);
app.delete("/api/deletequestion/:id", questionController.deleteQuestion);

// app.post("/api/user",userController.createUser)
app.use("/auth",authRouter)

// Error handler
app.use(globalErrorHandler);

module.exports = app;
